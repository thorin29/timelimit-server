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

import { memoize } from 'lodash'
import * as Sequelize from 'sequelize'
import { config } from '../../../config'
import { VisibleConnectedDevicesManager } from '../../../connected-devices'
import { Database } from '../../../database'
import { setToList } from '../../../util/list'
import { generateVersionId } from '../../../util/token'
import { SourceUserNotFoundException } from './exception/illegal-state'
import { InvalidChildActionIntegrityValue } from './exception/integrity'

export class Cache {
  readonly familyId: string
  readonly deviceId: string
  readonly hasFullVersion: boolean
  transaction: Sequelize.Transaction
  readonly database: Database
  readonly connectedDevicesManager: VisibleConnectedDevicesManager
  private shouldTriggerFullSync = false

  categoriesWithModifiedApps = new Set<string>()
  categoriesWithModifiedBaseData = new Set<string>()
  categoriesWithModifiedTimeLimitRules = new Set<string>()
  categoriesWithModifiedUsedTimes = new Set<string>()
  categoriesWithModifiedTasks = new Set<string>()

  devicesWithModifiedInstalledApps = new Set<string>()
  devicesWithModifiedShowDeviceConnected = new Map<string, boolean>()

  invalidiateUserList = false
  invalidiateDeviceList = false
  areChangesImportant = false

  constructor ({ familyId, deviceId, hasFullVersion, database, transaction, connectedDevicesManager }: {
    familyId: string
    deviceId: string
    hasFullVersion: boolean
    database: Database
    transaction: Sequelize.Transaction
    connectedDevicesManager: VisibleConnectedDevicesManager
  }) {
    this.familyId = familyId
    this.deviceId = deviceId
    this.hasFullVersion = hasFullVersion || config.alwaysPro
    this.database = database
    this.transaction = transaction
    this.connectedDevicesManager = connectedDevicesManager
  }

  async subtransaction<T> (callback: () => Promise<T>): Promise<T> {
    const oldTransaction = this.transaction

    return this.database.transaction(async (newTransaction) => {
      try {
        this.transaction = newTransaction

        const result = await callback()

        return result
      } finally {
        this.transaction = oldTransaction
      }
    }, { transaction: oldTransaction })
  }

  getSecondPasswordHashOfParent = memoize(async (parentId: string) => {
    const userEntryUnsafe = await this.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId: parentId,
        type: 'parent'
      },
      attributes: ['secondPasswordHash'],
      transaction: this.transaction
    })

    if (!userEntryUnsafe) {
      throw new SourceUserNotFoundException()
    }

    return userEntryUnsafe.secondPasswordHash
  })

  getSecondPasswordHashOfChild = memoize(async (childId: string) => {
    const userEntryUnsafe = await this.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId: childId,
        type: 'child'
      },
      attributes: ['secondPasswordHash'],
      transaction: this.transaction
    })

    if (!userEntryUnsafe) {
      throw new SourceUserNotFoundException()
    }

    if (!userEntryUnsafe.secondPasswordHash) {
      throw new InvalidChildActionIntegrityValue()
    }

    return userEntryUnsafe.secondPasswordHash
  })

  doesCategoryExist = memoize(async (categoryId: string) => {
    const categoryEntry = await this.database.category.findOne({
      where: {
        familyId: this.familyId,
        categoryId
      },
      transaction: this.transaction
    })

    return !!categoryEntry
  })

  doesUserExist = memoize(async (userId: string) => {
    const userEntry = await this.database.user.findOne({
      where: {
        familyId: this.familyId,
        userId
      },
      transaction: this.transaction
    })

    return !!userEntry
  })

  shouldDoFullSync = () => this.shouldTriggerFullSync
  requireFullSync: () => void = () => this.shouldTriggerFullSync = true

  async saveModifiedVersionNumbers () {
    const { database, transaction, familyId } = this

    if (this.categoriesWithModifiedApps.size > 0) {
      await database.category.update({
        assignedAppsVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedApps)
          }
        },
        transaction
      })

      this.categoriesWithModifiedApps.clear()
    }

    if (this.categoriesWithModifiedBaseData.size > 0) {
      await database.category.update({
        baseVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedBaseData)
          }
        },
        transaction
      })

      this.categoriesWithModifiedBaseData.clear()
    }

    if (this.categoriesWithModifiedTimeLimitRules.size > 0) {
      await database.category.update({
        timeLimitRulesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedTimeLimitRules)
          }
        },
        transaction
      })

      this.categoriesWithModifiedTimeLimitRules.clear()
    }

    if (this.categoriesWithModifiedUsedTimes.size > 0) {
      await database.category.update({
        usedTimesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedUsedTimes)
          }
        },
        transaction
      })

      this.categoriesWithModifiedUsedTimes.clear()
    }

    if (this.categoriesWithModifiedTasks.size > 0) {
      await database.category.update({
        taskListVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: setToList(this.categoriesWithModifiedTasks)
          }
        },
        transaction
      })

      this.categoriesWithModifiedUsedTimes.clear()
    }

    if (this.devicesWithModifiedInstalledApps.size > 0) {
      await database.device.update({
        installedAppsVersion: generateVersionId()
      }, {
        where: {
          familyId,
          deviceId: {
            [Sequelize.Op.in]: setToList(this.devicesWithModifiedInstalledApps)
          }
        },
        transaction
      })

      this.devicesWithModifiedInstalledApps.clear()
    }

    if (this.invalidiateUserList) {
      await database.family.update({
        userListVersion: generateVersionId()
      }, {
        where: {
          familyId: this.familyId
        },
        transaction
      })

      this.invalidiateUserList = false
    }

    if (this.invalidiateDeviceList) {
      await database.family.update({
        deviceListVersion: generateVersionId()
      }, {
        where: {
          familyId: this.familyId
        },
        transaction
      })

      this.invalidiateDeviceList = false
    }

    this.devicesWithModifiedShowDeviceConnected.forEach((showDeviceConnected, deviceId) => {
      this.connectedDevicesManager.notifyShareConnectedChanged({
        familyId: this.familyId,
        deviceId,
        showDeviceConnected
      })
    })
  }
}
