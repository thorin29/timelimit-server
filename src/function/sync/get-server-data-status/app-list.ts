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

import { difference, filter } from 'lodash'
import * as Sequelize from 'sequelize'
import { Database } from '../../../database'
import { ClientDataStatusApps } from '../../../object/clientdatastatus'
import { ServerInstalledAppsData } from '../../../object/serverdatastatus'
import { GetServerDataStatusIllegalStateException } from './exception'
import { FamilyEntry } from './family-entry'

export async function getAppList ({ database, transaction, familyEntry, appsStatus }: {
  database: Database
  transaction: Sequelize.Transaction
  familyEntry: FamilyEntry
  appsStatus: ClientDataStatusApps
}): Promise<Array<ServerInstalledAppsData> | null> {
  const serverInstalledAppsVersions = (await database.device.findAll({
    where: {
      familyId: familyEntry.familyId
    },
    attributes: ['deviceId', 'installedAppsVersion'],
    transaction
  })).map((item) => ({
    deviceId: item.deviceId,
    installedAppsVersion: item.installedAppsVersion
  }))

  const getServerInstalledAppsVersionByDeviceId = (deviceId: string) => {
    const entry = serverInstalledAppsVersions.find((item) => item.deviceId === deviceId)

    if (!entry) {
      throw new GetServerDataStatusIllegalStateException({ staticMessage: 'could not find device entry' })
    }

    return entry.installedAppsVersion
  }

  const serverDeviceIds = serverInstalledAppsVersions.map((item) => item.deviceId)
  const clientDeviceIds = Object.keys(appsStatus)
  const addedDeviceIds = difference(serverDeviceIds, clientDeviceIds)
  const deviceIdsWhereInstalledAppsHaveChanged = filter(Object.keys(appsStatus), (deviceId) => {
    const installedAppsVersion = appsStatus[deviceId]

    const serverEntry = serverInstalledAppsVersions.find((item) => item.deviceId === deviceId)

    return !!serverEntry && serverEntry.installedAppsVersion !== installedAppsVersion
  })
  const idsOfDevicesWhereInstalledAppsMustBeSynced = [...addedDeviceIds, ...deviceIdsWhereInstalledAppsHaveChanged]

  if (idsOfDevicesWhereInstalledAppsMustBeSynced.length > 0) {
    const [appsToSync, activitiesToSync] = await Promise.all([
      database.app.findAll({
        where: {
          familyId: familyEntry.familyId,
          deviceId: {
            [Sequelize.Op.in]: idsOfDevicesWhereInstalledAppsMustBeSynced
          }
        },
        attributes: [
          'deviceId',
          'packageName',
          'title',
          'isLaunchable',
          'recommendation'
        ],
        transaction
      }).map((item) => ({
        deviceId: item.deviceId,
        packageName: item.packageName,
        title: item.title,
        isLaunchable: item.isLaunchable,
        recommendation: item.recommendation
      })),
      database.appActivity.findAll({
        where: {
          familyId: familyEntry.familyId,
          deviceId: {
            [Sequelize.Op.in]: idsOfDevicesWhereInstalledAppsMustBeSynced
          }
        },
        attributes: [
          'deviceId',
          'packageName',
          'title',
          'activityName'
        ],
        transaction
      }).map((item) => ({
        deviceId: item.deviceId,
        packageName: item.packageName,
        activityName: item.activityName,
        title: item.title
      }))
    ])

    return idsOfDevicesWhereInstalledAppsMustBeSynced.map((deviceId): ServerInstalledAppsData => ({
      deviceId,
      apps: appsToSync.filter((item) => item.deviceId === deviceId).map((item) => ({
        packageName: item.packageName,
        title: item.title,
        isLaunchable: item.isLaunchable,
        recommendation: item.recommendation
      })),
      activities: activitiesToSync.filter((item) => item.deviceId === deviceId).map((item) => ({
        p: item.packageName,
        c: item.activityName,
        t: item.title
      })),
      version: getServerInstalledAppsVersionByDeviceId(deviceId)
    }))
  } else return null // no changes
}
