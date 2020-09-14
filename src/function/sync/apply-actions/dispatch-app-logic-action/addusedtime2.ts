/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as Sequelize from 'sequelize'
import { AddUsedTimeActionVersion2 } from '../../../../action'
import { EventHandler } from '../../../../monitoring/eventhandler'
import { MinuteOfDay } from '../../../../util/minuteofday'
import { Cache } from '../cache'
import { getRoundedTimestamp as getRoundedTimestampForUsedTime } from './addusedtime'

export const getRoundedTimestampForSessionDuration = () => {
  const now = Date.now()

  return now - (now % (1000 * 60 * 60 * 12 /* 12 hours */))
}

export async function dispatchAddUsedTimeVersion2 ({ deviceId, action, cache, eventHandler }: {
  deviceId: string
  action: AddUsedTimeActionVersion2
  cache: Cache
  eventHandler: EventHandler
}) {
  const deviceEntryUnsafe = await cache.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: deviceId
    },
    attributes: ['currentUserId'],
    transaction: cache.transaction
  })

  if (!deviceEntryUnsafe) {
    throw new Error('source device not found')
  }

  const deviceEntry = {
    currentUserId: deviceEntryUnsafe.currentUserId
  }

  const roundedTimestampForUsedTime = getRoundedTimestampForUsedTime().toString(10)
  const roundedTimestampForSessionDuration = getRoundedTimestampForSessionDuration().toString(10)

  let addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice = false

  for (let i = 0; i < action.items.length; i++) {
    const item = action.items[i]

    const categoryEntryUnsafe = await cache.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: item.categoryId
      },
      transaction: cache.transaction,
      attributes: [
        'childId',
        'extraTimeInMillis'
      ]
    })

    // verify that the category exists
    if (!categoryEntryUnsafe) {
      cache.requireFullSync()

      return
    }

    const categoryEntry = {
      childId: categoryEntryUnsafe.childId,
      extraTimeInMillis: categoryEntryUnsafe.extraTimeInMillis
    }

    if (categoryEntry.childId !== deviceEntry.currentUserId) {
      addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice = true
    }

    // tslint:disable-next-line:no-inner-declarations
    async function handle (start: number, end: number) {
      const lengthInMinutes = (end - start) + 1
      const lengthInMs = lengthInMinutes * 1000 * 60

      const maxOperator = cache.database.dialect === 'sqlite' ? 'MAX' : 'GREATEST'
      const minOperator = cache.database.dialect === 'sqlite' ? 'MIN' : 'LEAST'

      // try to update first
      const [updatedRows] = await cache.database.usedTime.update({
        usedTime: Sequelize.literal(`${maxOperator}(0, ${minOperator}(usedTime + ${item.timeToAdd}, ${lengthInMs}))`) as any,
        lastUpdate: roundedTimestampForUsedTime
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch,
          startMinuteOfDay: start,
          endMinuteOfDay: end
        },
        transaction: cache.transaction
      })

      // otherwise create
      if (updatedRows === 0) {
        await cache.database.usedTime.create({
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch,
          usedTime: Math.min(item.timeToAdd, lengthInMs),
          lastUpdate: roundedTimestampForUsedTime,
          startMinuteOfDay: start,
          endMinuteOfDay: end
        }, {
          transaction: cache.transaction
        })
      }
    }

    await handle(MinuteOfDay.MIN, MinuteOfDay.MAX)

    for (let j = 0; j < item.additionalCountingSlots.length; j++) {
      const slot = item.additionalCountingSlots[j]

      await handle(slot.start, slot.end)
    }

    const hasTrustedTimestamp = action.trustedTimestamp !== 0

    for (let j = 0; j < item.sessionDurationLimits.length; j++) {
      const limit = item.sessionDurationLimits[j]

      const oldItem = await cache.database.sessionDuration.findOne({
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId,
          maxSessionDuration: limit.duration,
          sessionPauseDuration: limit.pause,
          startMinuteOfDay: limit.start,
          endMinuteOfDay: limit.end
        },
        transaction: cache.transaction
      })

      if (oldItem) {
        let extendSession: boolean

        if (!hasTrustedTimestamp) {
          extendSession = true
        } else {
          /*
           * Why the tolerance?
           *
           * The main loop is executed in some interval and it assumes
           * at the end of the interval that the same application was used during
           * the previous phase.
           *
           * Now, if the session duration limit ends during this phase and the application is
           * launched again, then it extends the session (because it is assumed to be running
           * before the session ended) and blocks again.
           *
           * Due to this, a session is reset if it would be over in a few seconds, too.
           */

          const tolerance = 5 * 1000  // 5 seconds
          const timeWhenStartingCurrentUsage = action.trustedTimestamp - item.timeToAdd
          const nextSessionStart = parseInt(oldItem.lastUsage, 10) + oldItem.sessionPauseDuration - tolerance

          extendSession = timeWhenStartingCurrentUsage <= nextSessionStart
        }

        oldItem.lastSessionDuration = extendSession ? oldItem.lastSessionDuration + item.timeToAdd : item.timeToAdd
        oldItem.roundedLastUpdate = roundedTimestampForSessionDuration

        if (hasTrustedTimestamp) {
          oldItem.lastUsage = action.trustedTimestamp.toString(10)
        }

        await oldItem.save({ transaction: cache.transaction })
      } else {
        await cache.database.sessionDuration.create({
          familyId: cache.familyId,
          categoryId: item.categoryId,
          maxSessionDuration: limit.duration,
          sessionPauseDuration: limit.pause,
          startMinuteOfDay: limit.start,
          endMinuteOfDay: limit.end,
          // end of primary key
          lastUsage: action.trustedTimestamp,
          lastSessionDuration: item.timeToAdd,
          roundedLastUpdate: roundedTimestampForSessionDuration
        }, { transaction: cache.transaction })
      }
    }

    cache.categoriesWithModifiedUsedTimes.push(item.categoryId)

    if (item.extraTimeToSubtract !== 0) {
      await cache.database.category.update({
        extraTimeInMillis: Math.max(0, categoryEntry.extraTimeInMillis - item.extraTimeToSubtract)
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId
        },
        transaction: cache.transaction
      })

      cache.categoriesWithModifiedBaseData.push(item.categoryId)
    }

    if (addUsedTimeForADifferentUserThanTheCurrentUserOfTheDevice) {
      // there are two possible causes for this:
      // - a device user was changed remotely while it was used by this user for
      //   limited Apps (rarely)
      // - a parent added time manually (rarely)
      //
      // For the second case, it's important to sync this change.
      // As it should occur not too often, a full sync should be no problem.
      // To keep an eye on it, it is counted.

      cache.areChangesImportant = true

      eventHandler.countEvent('add used time for a different user than the current user of the device')
    }
  }
}
