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
import { Cache } from '../cache'
import { getRoundedTimestamp } from './addusedtime'

export async function dispatchAddUsedTimeVersion2 ({ deviceId, action, cache }: {
  deviceId: string
  action: AddUsedTimeActionVersion2
  cache: Cache
}) {
  const roundedTimestamp = getRoundedTimestamp().toString(10)

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

    if (item.timeToAdd !== 0) {
      // try to update first
      const [updatedRows] = await cache.database.usedTime.update({
        usedTime: Sequelize.literal(`usedTime + ${item.timeToAdd}`) as any,
        lastUpdate: roundedTimestamp
      }, {
        where: {
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch
        },
        transaction: cache.transaction
      })

      // otherwise create
      if (updatedRows === 0) {
        await cache.database.usedTime.create({
          familyId: cache.familyId,
          categoryId: item.categoryId,
          dayOfEpoch: action.dayOfEpoch,
          usedTime: item.timeToAdd,
          lastUpdate: roundedTimestamp
        }, {
          transaction: cache.transaction
        })
      }

      cache.categoriesWithModifiedUsedTimes.push(item.categoryId)
    }

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
  }
}
