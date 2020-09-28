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

import { memoize, uniq } from 'lodash'
import * as Sequelize from 'sequelize'
import { config } from '../../../config'
import { VisibleConnectedDevicesManager } from '../../../connected-devices'
import { Database } from '../../../database'
import { generateVersionId } from '../../../util/token'

export class Cache {
  readonly familyId: string
  readonly hasFullVersion: boolean
  transaction: Sequelize.Transaction
  readonly database: Database
  readonly connectedDevicesManager: VisibleConnectedDevicesManager
  private shouldTriggerFullSync = false

  categoriesWithModifiedApps: Array<string> = []
  categoriesWithModifiedBaseData: Array<string> = []
  categoriesWithModifiedTimeLimitRules: Array<string> = []
  categoriesWithModifiedUsedTimes: Array<string> = []

  devicesWithModifiedInstalledApps: Array<string> = []
  devicesWithModifiedShowDeviceConnected = new Map<string, boolean>()

  invalidiateUserList = false
  invalidiateDeviceList = false
  areChangesImportant = false

  constructor ({ familyId, hasFullVersion, database, transaction, connectedDevicesManager }: {
    familyId: string
    hasFullVersion: boolean
    database: Database
    transaction: Sequelize.Transaction
    connectedDevicesManager: VisibleConnectedDevicesManager
  }) {
    this.familyId = familyId
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
      throw new Error('user not found')
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
      throw new Error('user not found')
    }

    if (!userEntryUnsafe.secondPasswordHash) {
      throw new Error('user does not have a password')
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

    if (this.categoriesWithModifiedApps.length > 0) {
      await database.category.update({
        assignedAppsVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: uniq(this.categoriesWithModifiedApps)
          }
        },
        transaction
      })

      this.categoriesWithModifiedApps = []
    }

    if (this.categoriesWithModifiedBaseData.length > 0) {
      await database.category.update({
        baseVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: uniq(this.categoriesWithModifiedBaseData)
          }
        },
        transaction
      })

      this.categoriesWithModifiedBaseData = []
    }

    if (this.categoriesWithModifiedTimeLimitRules.length > 0) {
      await database.category.update({
        timeLimitRulesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: uniq(this.categoriesWithModifiedTimeLimitRules)
          }
        },
        transaction
      })

      this.categoriesWithModifiedTimeLimitRules = []
    }

    if (this.categoriesWithModifiedUsedTimes.length > 0) {
      await database.category.update({
        usedTimesVersion: generateVersionId()
      }, {
        where: {
          familyId,
          categoryId: {
            [Sequelize.Op.in]: uniq(this.categoriesWithModifiedUsedTimes)
          }
        },
        transaction
      })

      this.categoriesWithModifiedUsedTimes = []
    }

    if (this.devicesWithModifiedInstalledApps.length > 0) {
      await database.device.update({
        installedAppsVersion: generateVersionId()
      }, {
        where: {
          familyId,
          deviceId: {
            [Sequelize.Op.in]: uniq(this.devicesWithModifiedInstalledApps)
          }
        },
        transaction
      })

      this.devicesWithModifiedInstalledApps = []
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
