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

import { difference, filter, intersection } from 'lodash'
import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { ClientDataStatus } from '../../object/clientdatastatus'
import {
  ServerDataStatus, ServerInstalledAppsData, ServerUpdatedCategoryAssignedApps,
  ServerUpdatedCategoryBaseData, ServerUpdatedCategoryUsedTimes,
  ServerUpdatedTimeLimitRules
} from '../../object/serverdatastatus'

export const generateServerDataStatus = async ({ database, clientStatus, familyId, transaction }: {
  database: Database,
  clientStatus: ClientDataStatus,
  familyId: string
  transaction: Sequelize.Transaction
}): Promise<ServerDataStatus> => {
  const familyEntryUnsafe = await database.family.findOne({
    where: {
      familyId
    },
    attributes: [
      'deviceListVersion',
      'userListVersion',
      'hasFullVersion',
      'fullVersionUntil'
    ],
    transaction
  })

  if (!familyEntryUnsafe) {
    throw new Error('illegal state')
  }

  const familyEntry = {
    deviceListVersion: familyEntryUnsafe.deviceListVersion,
    userListVersion: familyEntryUnsafe.userListVersion,
    hasFullVersion: familyEntryUnsafe.hasFullVersion,
    fullVersionUntil: familyEntryUnsafe.fullVersionUntil
  }

  let result: ServerDataStatus = {
    fullVersion: familyEntry.hasFullVersion ? parseInt(familyEntry.fullVersionUntil, 10) : 0,
    message: process.env.STATUS_MESSAGE || undefined
  }

  if (familyEntry.deviceListVersion !== clientStatus.devices) {
    const devices = (await database.device.findAll({
      where: {
        familyId
      },
      transaction
    }))

    result.devices = {
      version: familyEntry.deviceListVersion,
      data: devices.map((item) => ({
        deviceId: item.deviceId,
        name: item.name,
        model: item.model,
        addedAt: parseInt(item.addedAt, 10),
        currentUserId: item.currentUserId,
        networkTime: item.networkTime,
        cProtectionLevel: item.currentProtectionLevel,
        hProtectionLevel: item.highestProtectionLevel,
        cUsageStats: item.currentUsageStatsPermission,
        hUsageStats: item.highestUsageStatsPermission,
        cNotificationAccess: item.currentNotificationAccessPermission,
        hNotificationAccess: item.highestNotificationAccessPermission,
        cAppVersion: item.currentAppVersion,
        hAppVersion: item.highestAppVersion,
        tDisablingAdmin: item.triedDisablingDeviceAdmin,
        reboot: item.didReboot,
        hadManipulation: item.hadManipulation,
        reportUninstall: item.didDeviceReportUninstall,
        isUserKeptSignedIn: item.isUserKeptSignedIn,
        showDeviceConnected: item.showDeviceConnected,
        defUser: item.defaultUserId,
        defUserTimeout: item.defaultUserTimeout,
        rebootIsManipulation: item.considerRebootManipulation
      }))
    }
  }

  if (familyEntry.userListVersion !== clientStatus.users) {
    const users = (await database.user.findAll({
      where: {
        familyId
      },
      attributes: [
        'userId',
        'name',
        'passwordHash',
        'secondPasswordSalt',
        'type',
        'timeZone',
        'disableTimelimitsUntil',
        'mail',
        'currentDevice',
        'categoryForNotAssignedApps',
        'relaxPrimaryDeviceRule',
        'mailNotificationFlags'
      ],
      transaction
    })).map((item) => ({
      userId: item.userId,
      name: item.name,
      passwordHash: item.passwordHash,
      secondPasswordSalt: item.secondPasswordSalt,
      type: item.type,
      timeZone: item.timeZone,
      disableTimelimitsUntil: item.disableTimelimitsUntil,
      mail: item.mail,
      currentDevice: item.currentDevice,
      categoryForNotAssignedApps: item.categoryForNotAssignedApps,
      relaxPrimaryDeviceRule: item.relaxPrimaryDeviceRule,
      mailNotificationFlags: item.mailNotificationFlags
    }))

    result.users = {
      version: familyEntry.userListVersion,
      data: users.map((item) => ({
        id: item.userId,
        name: item.name,
        password: item.passwordHash,
        secondPasswordSalt: item.secondPasswordSalt,
        type: item.type,
        timeZone: item.timeZone,
        disableLimitsUntil: parseInt(item.disableTimelimitsUntil, 10),
        mail: item.mail,
        currentDevice: item.currentDevice,
        categoryForNotAssignedApps: item.categoryForNotAssignedApps,
        relaxPrimaryDevice: item.relaxPrimaryDeviceRule,
        mailNotificationFlags: item.mailNotificationFlags
      }))
    }
  }

  const serverInstalledAppsVersions = (await database.device.findAll({
    where: {
      familyId
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
      throw new Error('illegal state')
    }

    return entry.installedAppsVersion
  }

  const serverDeviceIds = serverInstalledAppsVersions.map((item) => item.deviceId)
  const clientDeviceIds = Object.keys(clientStatus.apps)
  const addedDeviceIds = difference(serverDeviceIds, clientDeviceIds)
  const deviceIdsWhereInstalledAppsHaveChanged = filter(Object.keys(clientStatus.apps), (deviceId) => {
    const installedAppsVersion = clientStatus.apps[deviceId]

    const serverEntry = serverInstalledAppsVersions.find((item) => item.deviceId === deviceId)

    return !!serverEntry && serverEntry.installedAppsVersion !== installedAppsVersion
  })
  const idsOfDevicesWhereInstalledAppsMustBeSynced = [...addedDeviceIds, ...deviceIdsWhereInstalledAppsHaveChanged]

  if (idsOfDevicesWhereInstalledAppsMustBeSynced.length > 0) {
    const dataToSync = (await database.app.findAll({
      where: {
        familyId,
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
    })).map((item) => ({
      deviceId: item.deviceId,
      packageName: item.packageName,
      title: item.title,
      isLaunchable: item.isLaunchable,
      recommendation: item.recommendation
    }))

    result.apps = idsOfDevicesWhereInstalledAppsMustBeSynced.map((deviceId): ServerInstalledAppsData => ({
      deviceId,
      apps: dataToSync.filter((item) => item.deviceId === deviceId).map((item) => ({
        packageName: item.packageName,
        title: item.title,
        isLaunchable: item.isLaunchable,
        recommendation: item.recommendation
      })),
      version: getServerInstalledAppsVersionByDeviceId(deviceId)
    }))
  }

  const serverCategoriesVersions = (await database.category.findAll({
    where: {
      familyId
    },
    attributes: [
      'categoryId',
      'baseVersion',
      'assignedAppsVersion',
      'timeLimitRulesVersion',
      'usedTimesVersion'
    ],
    transaction
  })).map((item) => ({
    categoryId: item.categoryId,
    baseVersion: item.baseVersion,
    assignedAppsVersion: item.assignedAppsVersion,
    timeLimitRulesVersion: item.timeLimitRulesVersion,
    usedTimesVersion: item.usedTimesVersion
  }))

  const serverCategoryIds = serverCategoriesVersions.map((item) => item.categoryId)
  const clientCategoryIds = Object.keys(clientStatus.categories)

  const removedCategoryIds = difference(clientCategoryIds, serverCategoryIds)

  if (removedCategoryIds.length > 0) {
    result.rmCategories = removedCategoryIds
  }

  const addedCategoryIds = difference(serverCategoryIds, clientCategoryIds)
  const categoryIdsOfClientAndServer = intersection(serverCategoryIds, clientCategoryIds)

  const categoryIdsToSyncBaseData = [...addedCategoryIds]
  const categoryIdsToSyncAssignedApps = [...addedCategoryIds]
  const categoryIdsToSyncRules = [...addedCategoryIds]
  const categoryIdsToSyncUsedTimes = [...addedCategoryIds]

  categoryIdsOfClientAndServer.forEach((categoryId) => {
    const serverEntry = serverCategoriesVersions.find((item) => item.categoryId === categoryId)
    const clientEntry = clientStatus.categories[categoryId]

    if ((!serverEntry) || (!clientEntry)) {
      throw new Error('illegal state')
    }

    if (serverEntry.baseVersion !== clientEntry.base) {
      categoryIdsToSyncBaseData.push(categoryId)
    }

    if (serverEntry.assignedAppsVersion !== clientEntry.apps) {
      categoryIdsToSyncAssignedApps.push(categoryId)
    }

    if (serverEntry.timeLimitRulesVersion !== clientEntry.rules) {
      categoryIdsToSyncRules.push(categoryId)
    }

    if (serverEntry.usedTimesVersion !== clientEntry.usedTime) {
      categoryIdsToSyncUsedTimes.push(categoryId)
    }
  })

  if (categoryIdsToSyncBaseData.length > 0) {
    const dataForSyncing = (await database.category.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncBaseData
        }
      },
      attributes: [
        'categoryId',
        'childId',
        'title',
        'blockedMinutesInWeek',
        'extraTimeInMillis',
        'temporarilyBlocked',
        'baseVersion',
        'parentCategoryId',
        'blockAllNotifications'
      ],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      childId: item.childId,
      title: item.title,
      blockedMinutesInWeek: item.blockedMinutesInWeek,
      extraTimeInMillis: item.extraTimeInMillis,
      temporarilyBlocked: item.temporarilyBlocked,
      baseVersion: item.baseVersion,
      parentCategoryId: item.parentCategoryId,
      blockAllNotifications: item.blockAllNotifications
    }))

    result.categoryBase = dataForSyncing.map((item): ServerUpdatedCategoryBaseData => ({
      categoryId: item.categoryId,
      childId: item.childId,
      title: item.title,
      blockedTimes: item.blockedMinutesInWeek,
      extraTime: item.extraTimeInMillis,
      tempBlocked: item.temporarilyBlocked,
      version: item.baseVersion,
      parentCategoryId: item.parentCategoryId,
      blockAllNotifications: item.blockAllNotifications
    }))
  }

  if (categoryIdsToSyncAssignedApps.length > 0) {
    const dataForSyncing = (await database.categoryApp.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncAssignedApps
        }
      },
      attributes: ['categoryId', 'packageName'],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      packageName: item.packageName
    }))

    const getCategoryAssingedAppsVersion = (categoryId: string) => {
      const categoryEntry = serverCategoriesVersions.find((item) => item.categoryId === categoryId)

      if (!categoryEntry) {
        throw new Error('illegal state')
      }

      return categoryEntry.assignedAppsVersion
    }

    result.categoryApp = categoryIdsToSyncAssignedApps.map((categoryId): ServerUpdatedCategoryAssignedApps => ({
      categoryId,
      apps: dataForSyncing.filter((item) => item.categoryId === categoryId).map((item) => item.packageName),
      version: getCategoryAssingedAppsVersion(categoryId)
    }))
  }

  if (categoryIdsToSyncRules.length > 0) {
    const dataForSyncing = (await database.timelimitRule.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncRules
        }
      },
      attributes: [
        'ruleId',
        'categoryId',
        'applyToExtraTimeUsage',
        'maximumTimeInMillis',
        'dayMaskAsBitmask'
      ],
      transaction
    })).map((item) => ({
      ruleId: item.ruleId,
      categoryId: item.categoryId,
      applyToExtraTimeUsage: item.applyToExtraTimeUsage,
      maximumTimeInMillis: item.maximumTimeInMillis,
      dayMaskAsBitmask: item.dayMaskAsBitmask
    }))

    const getCategoryRulesVersion = (categoryId: string) => {
      const categoryEntry = serverCategoriesVersions.find((item) => item.categoryId === categoryId)

      if (!categoryEntry) {
        throw new Error('illegal state')
      }

      return categoryEntry.timeLimitRulesVersion
    }

    result.rules = categoryIdsToSyncRules.map((categoryId): ServerUpdatedTimeLimitRules => ({
      categoryId,
      rules: dataForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
        id: item.ruleId,
        extraTime: item.applyToExtraTimeUsage,
        dayMask: item.dayMaskAsBitmask,
        maxTime: item.maximumTimeInMillis
      })),
      version: getCategoryRulesVersion(categoryId)
    }))
  }

  if (categoryIdsToSyncUsedTimes.length > 0) {
    const dataForSyncing = (await database.usedTime.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncUsedTimes
        }
      },
      attributes: ['categoryId', 'dayOfEpoch', 'usedTime'],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      dayOfEpoch: item.dayOfEpoch,
      usedTime: item.usedTime
    }))

    const getCategoryUsedTimesVersion = (categoryId: string) => {
      const categoryEntry = serverCategoriesVersions.find((item) => item.categoryId === categoryId)

      if (!categoryEntry) {
        throw new Error('illegal state')
      }

      return categoryEntry.usedTimesVersion
    }

    result.usedTimes = categoryIdsToSyncUsedTimes.map((categoryId): ServerUpdatedCategoryUsedTimes => ({
      categoryId,
      times: dataForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
        day: item.dayOfEpoch,
        time: item.usedTime
      })),
      version: getCategoryUsedTimesVersion(categoryId)
    }))
  }

  return result
}
