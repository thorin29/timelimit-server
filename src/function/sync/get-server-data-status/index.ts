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

import * as Sequelize from 'sequelize'
import { config } from '../../../config'
import { Database } from '../../../database'
import { getStatusMessage } from '../../../function/statusmessage'
import { ClientDataStatus } from '../../../object/clientdatastatus'
import { ServerDataStatus } from '../../../object/serverdatastatus'
import { getAppList } from './app-list'
import {
  getCategoryAssignedApps, getCategoryBaseDatas, getCategoryDataToSync,
  getRules, getTasks, getUsedTimes
} from './category'
import { getDeviceDetailList } from './device-detail'
import { getDeviceList } from './device-list'
import { getFamilyEntry } from './family-entry'
import { getUserList } from './user-list'
import { getKeyRequests } from './key-requests'
import { getKeyResponses } from './key-responses'

export const generateServerDataStatus = async ({
  database, clientStatus, familyId, deviceId, transaction
}: {
  database: Database
  clientStatus: ClientDataStatus
  familyId: string
  deviceId: string
  transaction: Sequelize.Transaction
}): Promise<ServerDataStatus> => {
  const familyEntry = await getFamilyEntry({ database, familyId, transaction })
  const doesClientSupportTasks = clientStatus.clientLevel !== undefined && clientStatus.clientLevel >= 3
  const doesClientSupportCryptoApps = clientStatus.clientLevel !== undefined && clientStatus.clientLevel >= 4

  const result: ServerDataStatus = {
    fullVersion: config.alwaysPro ? 1 : (
      familyEntry.hasFullVersion ? parseInt(familyEntry.fullVersionUntil, 10) : 0
    ),
    message: await getStatusMessage({ database, transaction }) || undefined,
    apiLevel: 4
  }

  if (familyEntry.deviceListVersion !== clientStatus.devices) {
    result.devices = await getDeviceList({ database, transaction, familyEntry })
  }

  if (familyEntry.userListVersion !== clientStatus.users) {
    result.users = await getUserList({ database, transaction, familyEntry })
  }

  result.apps = await getAppList({ database, transaction, familyEntry, appsStatus: clientStatus.apps }) || undefined

  const categoryDataToSync = await getCategoryDataToSync({ database, transaction, familyEntry, categoriesStatus: clientStatus.categories })

  if (categoryDataToSync.removedCategoryIds.length > 0) {
    result.rmCategories = categoryDataToSync.removedCategoryIds
  }

  if (categoryDataToSync.categoryIdsToSyncBaseData.length > 0) {
    result.categoryBase = await getCategoryBaseDatas({
      database, transaction, familyEntry,
      categoryIdsToSyncBaseData: categoryDataToSync.categoryIdsToSyncBaseData
    })
  }

  if (categoryDataToSync.categoryIdsToSyncAssignedApps.length > 0) {
    result.categoryApp = await getCategoryAssignedApps({
      database, transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncAssignedApps: categoryDataToSync.categoryIdsToSyncAssignedApps
    })
  }

  if (categoryDataToSync.categoryIdsToSyncRules.length > 0) {
    result.rules = await getRules({
      database, transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncRules: categoryDataToSync.categoryIdsToSyncRules
    })
  }

  if (categoryDataToSync.categoryIdsToSyncUsedTimes.length > 0) {
    result.usedTimes = await getUsedTimes({
      database, transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncUsedTimes: categoryDataToSync.categoryIdsToSyncUsedTimes,
      clientLevel: clientStatus.clientLevel || null
    })
  }

  if (categoryDataToSync.categoryIdsToSyncTasks.length > 0 && doesClientSupportTasks) {
    result.tasks = await getTasks({
      database, transaction, familyEntry,
      serverCategoriesVersions: categoryDataToSync.serverCategoriesVersions,
      categoryIdsToSyncTasks: categoryDataToSync.categoryIdsToSyncTasks
    })
  }

  if (doesClientSupportCryptoApps) {
    result.devices2 = await getDeviceDetailList({
      database,
      transaction,
      familyEntry,
      devicesDetail: clientStatus.devicesDetail || {}
    }) || undefined

    result.krq = await getKeyRequests({
      database,
      transaction,
      familyEntry,
      deviceId,
      lastSeenRequestIndex: clientStatus.kri || null
    }) || undefined

    result.kr = await getKeyResponses({
      database,
      transaction,
      familyEntry,
      deviceId,
      lastSeenRequestIndex: clientStatus.kr || null
    }) || undefined
  }

  return result
}
