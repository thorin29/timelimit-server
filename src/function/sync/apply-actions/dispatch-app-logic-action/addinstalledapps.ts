/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 Jonas Lochmann
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
import { AddInstalledAppsAction } from '../../../../action'
import { AppAttributes } from '../../../../database/app'
import { Cache } from '../cache'

export async function dispatchAddInstalledApps ({ deviceId, action, cache }: {
  deviceId: string
  action: AddInstalledAppsAction
  cache: Cache
}) {
  await cache.database.app.destroy({
    where: {
      familyId: cache.familyId,
      deviceId,
      packageName: {
        [Sequelize.Op.in]: action.apps.map((app) => app.packageName)
      }
    },
    transaction: cache.transaction
  })

  await cache.database.app.bulkCreate(
    action.apps.map((app): AppAttributes => ({
      familyId: cache.familyId,
      deviceId,
      packageName: app.packageName,
      title: app.title,
      isLaunchable: app.isLaunchable,
      recommendation: app.recommendation
    })),
    { transaction: cache.transaction }
  )

  cache.devicesWithModifiedInstalledApps.push(deviceId)
}
