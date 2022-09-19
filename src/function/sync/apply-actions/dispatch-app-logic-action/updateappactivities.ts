/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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

import { chunk } from 'lodash'
import * as Sequelize from 'sequelize'
import { UpdateAppActivitiesAction } from '../../../../action'
import { AppActivityAttributes, maxActivityNameLength, maxPackageNameLength } from '../../../../database/appactivity'
import { Cache } from '../cache'
import { ApplyActionException } from '../exception'

export async function dispatchUpdateAppActivities ({ deviceId, action, cache }: {
  deviceId: string
  action: UpdateAppActivitiesAction
  cache: Cache
}) {
  action.updatedOrAdded.forEach((app) => {
    if (app.packageName.length > maxPackageNameLength) {
      throw new ApplyActionException({
        staticMessage: 'package name too long',
        dynamicMessage: 'package name too long: ' + app.packageName
      })
    }

    if (app.activityName.length > maxActivityNameLength) {
      throw new ApplyActionException({
        staticMessage: 'activity name too long',
        dynamicMessage: 'activity name too long: ' + app.activityName
      })
    }
  })

  if (action.updatedOrAdded.length > 0) {
    const chuncks = chunk(action.updatedOrAdded, 500)

    for (const items of chuncks) {
      await cache.database.appActivity.destroy({
        where: {
          familyId: cache.familyId,
          deviceId,
          [Sequelize.Op.or]: (
            items.map((item) => ({
              packageName: item.packageName,
              activityName: item.activityName
            }))
          )
        },
        transaction: cache.transaction
      })
    }

    await cache.database.appActivity.bulkCreate(
      action.updatedOrAdded.map((item): AppActivityAttributes => ({
        familyId: cache.familyId,
        deviceId,
        packageName: item.packageName,
        activityName: item.activityName,
        title: item.title
      })),
      { transaction: cache.transaction }
    )
  }

  if (action.removed.length > 0) {
    const chunks = chunk(action.removed, 500)

    for (const items of chunks) {
      await cache.database.appActivity.destroy({
        where: {
          familyId: cache.familyId,
          deviceId,
          [Sequelize.Op.or]: (
            items.map((item) => ({
              packageName: item.packageName,
              activityName: item.activityName
            }))
          )
        },
        transaction: cache.transaction
      })
    }
  }

  cache.devicesWithModifiedInstalledApps.add(deviceId)
  cache.incrementTriggeredSyncLevel(1)
}
