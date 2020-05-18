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

import { difference, filter, intersection } from 'lodash'
import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { getStatusMessage } from '../../function/statusmessage'
import { ClientDataStatus } from '../../object/clientdatastatus'
import {
  ServerDataStatus, ServerInstalledAppsData, ServerUpdatedCategoryAssignedApps,
  ServerUpdatedCategoryBaseData, ServerUpdatedCategoryUsedTimes,
  ServerUpdatedTimeLimitRules
} from '../../object/serverdatastatus'
import { MinuteOfDay } from '../../util/minuteofday'

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
    message: await getStatusMessage({ database, transaction }) || undefined
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
        hadManipulationFlags: item.hadManipulationFlags,
        reportUninstall: item.didDeviceReportUninstall,
        isUserKeptSignedIn: item.isUserKeptSignedIn,
        showDeviceConnected: item.showDeviceConnected,
        defUser: item.defaultUserId,
        defUserTimeout: item.defaultUserTimeout,
        rebootIsManipulation: item.considerRebootManipulation,
        cOverlay: item.currentOverlayPermission,
        hOverlay: item.highestOverlayPermission,
        asEnabled: item.asEnabled,
        wasAsEnabled: item.wasAsEnabled,
        activityLevelBlocking: item.activityLevelBlocking,
        qOrLater: item.isQorLater
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
        'mailNotificationFlags',
        'blockedTimes'
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
      mailNotificationFlags: item.mailNotificationFlags,
      blockedTimes: item.blockedTimes
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
        mailNotificationFlags: item.mailNotificationFlags,
        blockedTimes: item.blockedTimes
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
    const [appsToSync, activitiesToSync] = await Promise.all([
      database.app.findAll({
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
      }).map((item) => ({
        deviceId: item.deviceId,
        packageName: item.packageName,
        title: item.title,
        isLaunchable: item.isLaunchable,
        recommendation: item.recommendation
      })),
      database.appActivity.findAll({
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

    result.apps = idsOfDevicesWhereInstalledAppsMustBeSynced.map((deviceId): ServerInstalledAppsData => ({
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
        'extraTimeDay',
        'temporarilyBlocked',
        'baseVersion',
        'parentCategoryId',
        'blockAllNotifications',
        'timeWarningFlags',
        'minBatteryCharging',
        'minBatteryMobile',
        'temporarilyBlockedEndTime',
        'sort'
      ],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      childId: item.childId,
      title: item.title,
      blockedMinutesInWeek: item.blockedMinutesInWeek,
      extraTimeInMillis: item.extraTimeInMillis,
      extraTimeDay: item.extraTimeDay,
      temporarilyBlocked: item.temporarilyBlocked,
      baseVersion: item.baseVersion,
      parentCategoryId: item.parentCategoryId,
      blockAllNotifications: item.blockAllNotifications,
      timeWarningFlags: item.timeWarningFlags,
      minBatteryCharging: item.minBatteryCharging,
      minBatteryMobile: item.minBatteryMobile,
      temporarilyBlockedEndTime: item.temporarilyBlockedEndTime,
      sort: item.sort
    }))

    result.categoryBase = dataForSyncing.map((item): ServerUpdatedCategoryBaseData => ({
      categoryId: item.categoryId,
      childId: item.childId,
      title: item.title,
      blockedTimes: item.blockedMinutesInWeek,
      extraTime: item.extraTimeInMillis,
      extraTimeDay: item.extraTimeDay,
      tempBlocked: item.temporarilyBlocked,
      version: item.baseVersion,
      parentCategoryId: item.parentCategoryId,
      blockAllNotifications: item.blockAllNotifications,
      timeWarnings: item.timeWarningFlags,
      mblMobile: item.minBatteryMobile,
      mblCharging: item.minBatteryCharging,
      tempBlockTime: item.temporarilyBlockedEndTime,
      sort: item.sort
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
        'dayMaskAsBitmask',
        'startMinuteOfDay',
        'endMinuteOfDay',
        'sessionDurationMilliseconds',
        'sessionPauseMilliseconds'
      ],
      transaction
    })).map((item) => ({
      ruleId: item.ruleId,
      categoryId: item.categoryId,
      applyToExtraTimeUsage: item.applyToExtraTimeUsage,
      maximumTimeInMillis: item.maximumTimeInMillis,
      dayMaskAsBitmask: item.dayMaskAsBitmask,
      startMinuteOfDay: item.startMinuteOfDay,
      endMinuteOfDay: item.endMinuteOfDay,
      sessionDurationMilliseconds: item.sessionDurationMilliseconds,
      sessionPauseMilliseconds: item.sessionPauseMilliseconds
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
        maxTime: item.maximumTimeInMillis,
        start: item.startMinuteOfDay,
        end: item.endMinuteOfDay,
        session: item.sessionDurationMilliseconds,
        pause: item.sessionPauseMilliseconds
      })),
      version: getCategoryRulesVersion(categoryId)
    }))
  }

  if (categoryIdsToSyncUsedTimes.length > 0) {
    const usedTimesForSyncing = (await database.usedTime.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncUsedTimes
        },
        ...(clientStatus.clientLevel === undefined || clientStatus.clientLevel < 2) ? {
          startMinuteOfDay: MinuteOfDay.MIN,
          endMinuteOfDay: MinuteOfDay.MAX
        } : {}
      },
      attributes: [
        'categoryId', 'dayOfEpoch', 'usedTime', 'startMinuteOfDay', 'endMinuteOfDay'
      ],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      dayOfEpoch: item.dayOfEpoch,
      usedTime: item.usedTime,
      startMinuteOfDay: item.startMinuteOfDay,
      endMinuteOfDay: item.endMinuteOfDay
    }))

    const sessionDurationsForSyncing = (await database.sessionDuration.findAll({
      where: {
        familyId,
        categoryId: {
          [Sequelize.Op.in]: categoryIdsToSyncUsedTimes
        }
      },
      attributes: [
        'categoryId',
        'maxSessionDuration',
        'sessionPauseDuration',
        'startMinuteOfDay',
        'endMinuteOfDay',
        'lastUsage',
        'lastSessionDuration'
      ],
      transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      maxSessionDuration: item.maxSessionDuration,
      sessionPauseDuration: item.sessionPauseDuration,
      startMinuteOfDay: item.startMinuteOfDay,
      endMinuteOfDay: item.endMinuteOfDay,
      lastUsage: item.lastUsage,
      lastSessionDuration: item.lastSessionDuration
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
      times: usedTimesForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
        day: item.dayOfEpoch,
        time: item.usedTime,
        start: item.startMinuteOfDay,
        end: item.endMinuteOfDay
      })),
      sessionDurations: sessionDurationsForSyncing.filter((item) => item.categoryId === categoryId).map((item) => ({
        md: item.maxSessionDuration,
        spd: item.sessionPauseDuration,
        sm: item.startMinuteOfDay,
        em: item.endMinuteOfDay,
        l: parseInt(item.lastUsage, 10),
        d: item.lastSessionDuration
      })),
      version: getCategoryUsedTimesVersion(categoryId)
    }))
  }

  return result
}
