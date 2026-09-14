/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
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

import { Database as LegacyDatabase, Transaction as LegacyTransaction } from '../main'
import { generateAuthToken } from '../../util/token'

export interface SimpleDatabase {
  legacy: LegacyDatabase
  transaction: <T> (
    inner: (t: SimpleDatabaseTransaction) => Promise<T>
  ) => Promise<T>
}

export interface SimpleDatabaseTransaction {
  transaction: <T> (
    inner: (t: SimpleDatabaseTransaction) => Promise<T>
  ) => Promise<T>

  enqueueAfterCommit(callback: () => void): void

  family: {
    getFullVersionUntilAndDebtsByFamilyId: (familyId: string) => Promise<{ fullVersionUntil: number, fullVersionDebts: number } | null>
    hasFullVersionByFamilyId: (familyId: string) => Promise<boolean> // returns false if the family was not found
  }

  device: {
    getFamilyIdByAuthToken: (deviceAuthToken: string) => Promise<string | null>
    getFamilyIdAndDeviceNameByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceName: string} | null>
    getFamilyIdAndDeviceIdByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string} | null>
    getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string, currentUserId: string, isUserKeptSignedIn: boolean} | null>
    getDeviceIdsAndAuthTokensByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, deviceAuthToken: string }>>
  }

  user: {
    doesFamilyHaveUserWithMail: (params: { familyId: string, mail: string }) => Promise<boolean>
    doesSpecificParentUserExist: (params: { familyId: string, userId: string, mail: string }) => Promise<boolean>
    getSmallestMailAddressByFamilyId: (familyId: string) => Promise<string | null>
    getMailAddressByUserId: (params: { familyId: string, userId: string }) => Promise<string> // returns the empty string if the user was not found
    doesParentUserExist: (params: { familyId: string, userId: string }) => Promise<boolean>
    doesParentUserWithSpecificSecondPasswordHashExist: (params: { familyId: string, userId: string, secondPasswordHash: string }) => Promise<boolean>
  }

  mailLoginToken: {
    create: (params: { time: number, mail: string, code: string, locale: string }) => Promise<{ token: string }>
    query: (token: string) => Promise<{ mail: string, code: string, locale: string, remainingAttempts: number } | null>
    updateRemainingAttempts: (token: string, attempts: number) => Promise<{ found: boolean }>
    destroy: (token: string) => Promise<{ found: boolean }>
  }

  purchase: {
    getFamilyIdByPurchaseId: (purchaseId: string) => Promise<string | null>
    getLastPurchaseByFamilyId: (familyId: string) => Promise<{ purchaseId: string, loggedAt: number } | null>
  }

  legacy: {
    database: LegacyDatabase
    transaction: LegacyTransaction
  }
}

export function fromLegacy(database: LegacyDatabase): SimpleDatabase {
  return {
    legacy: database,
    transaction: (inner) => database.transaction((legacyTransaction) => inner(fromLegacyTransaction(database, legacyTransaction)))
  }
}

function fromLegacyTransaction(database: LegacyDatabase, legacyTransaction: LegacyTransaction): SimpleDatabaseTransaction {
  return {
    transaction: (inner) => database.transaction(
      (innerTransaction) => inner(fromLegacyTransaction(database, innerTransaction)),
      { transaction: legacyTransaction }
    ),
    family: {
      getFullVersionUntilAndDebtsByFamilyId: async (familyId: string) => {
        const item = await database.family.findOne({
          where: {
            familyId
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            fullVersionUntil: parseInt(item.fullVersionUntil),
            fullVersionDebts: parseInt(item.fullVersionDebts),
          }
        } else return null
      },
      hasFullVersionByFamilyId: async (familyId: string) => {
        const item = await database.family.findOne({
          where: {
            familyId
          },
          transaction: legacyTransaction,
          attributes: ['hasFullVersion']
        })

        return !!(item && item.hasFullVersion)
      }
    },
    device: {
      getFamilyIdByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId'],
          transaction: legacyTransaction
        })

        if (deviceEntry) return deviceEntry.familyId
        else return null
      },
      getFamilyIdAndDeviceNameByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'name'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceName: deviceEntry.name,
          }
        } else return null
      },
      getFamilyIdAndDeviceIdByAuthToken: async (deviceAuthToken) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
          }
        } else return null
      },
      getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken: async (deviceAuthToken: string) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId', 'currentUserId', 'isUserKeptSignedIn'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
            currentUserId: deviceEntry.currentUserId,
            isUserKeptSignedIn: deviceEntry.isUserKeptSignedIn
          }
        } else return null
      },
      getDeviceIdsAndAuthTokensByFamilyId: async (familyId) => {
        return (await database.device.findAll({
          where: {
            familyId
          },
          attributes: ['deviceId', 'deviceAuthToken'],
          transaction: legacyTransaction
        })).map((item) => ({
          deviceId: item.deviceId,
          deviceAuthToken: item.deviceAuthToken
        }))
      },
    },
    user: {
      doesFamilyHaveUserWithMail: async ({ familyId, mail }) => {
        if (mail === '') return false

        const userEntryCounter = await database.user.count({
          where: {
            familyId: familyId,
            mail
          },
          transaction: legacyTransaction
        })

        return userEntryCounter === 1
      },
      doesSpecificParentUserExist: async ({ familyId, userId, mail }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            userId,
            mail,
            type: 'parent'
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
      getSmallestMailAddressByFamilyId: async (familyId: string) => {
        const userEntryWithMail = await database.user.findOne({
          where: {
            familyId,
            mail: {
              [Sequelize.Op.ne]: ''
            },
            type: 'parent'
          },
          order: [['mail', 'ASC']],
          transaction: legacyTransaction
        })

        if (userEntryWithMail) return userEntryWithMail.mail
        else return null
      },
      getMailAddressByUserId: async ({ familyId, userId }) => {
        const item = await database.user.findOne({
          where: {
            familyId,
            userId,
          },
          transaction: legacyTransaction
        })

        if (item) return item.mail || ''
        else return ''
      },
      doesParentUserExist: async ({ familyId, userId }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            type: 'parent',
            userId,
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
      doesParentUserWithSpecificSecondPasswordHashExist: async ({ familyId, userId, secondPasswordHash }) => {
        const counter = await database.user.count({
          where: {
            familyId,
            type: 'parent',
            userId,
            secondPasswordHash: secondPasswordHash
          },
          transaction: legacyTransaction
        })

        return counter === 1
      },
    },
    mailLoginToken: {
      create: async ({ time, mail, code, locale }) => {
        const mailLoginToken = generateAuthToken()

        await database.mailLoginToken.create({
          mailLoginToken,
          receivedCode: code,
          mail,
          createdAt: time.toString(10),
          remainingAttempts: 3,
          locale
        }, { transaction: legacyTransaction })

        return { token: mailLoginToken }
      },
      query: async (token) => {
        const entry = await database.mailLoginToken.findOne({
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        if (entry) {
          return {
            mail: entry.mail,
            code: entry.receivedCode,
            locale: entry.locale,
            remainingAttempts: entry.remainingAttempts
          }
        } else return null
      },
      updateRemainingAttempts: async (token: string, attempts: number) => {
        const [counter] = await database.mailLoginToken.update({
          remainingAttempts: attempts
        }, {
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        return { found: counter === 1 }
      },
      destroy: async (token: string) => {
        const counter = await database.mailLoginToken.destroy({
          where: {
            mailLoginToken: token
          },
          transaction: legacyTransaction
        })

        return { found: counter === 1 }
      }
    },
    purchase: {
      getFamilyIdByPurchaseId: async (purchaseId: string) => {
        const item = await database.purchase.findOne({
          where: {
            service: 'directpurchase',
            transactionId: purchaseId
          },
          transaction: legacyTransaction
        })

        if (item) return item.familyId
        else return null
      },
      getLastPurchaseByFamilyId: async (familyId: string) => {
        const item = await database.purchase.findOne({
          where: {
            familyId: familyId
          },
          transaction: legacyTransaction,
          order: [['loggedAt', 'DESC']],
          limit: 1
        })

        if (item) {
          return {
            purchaseId: item.transactionId,
            loggedAt: parseInt(item.loggedAt)
          }
        } else return null
      },
    },
    enqueueAfterCommit: (afterCommitAction) => legacyTransaction.afterCommit(afterCommitAction),
    legacy: {
      database,
      transaction: legacyTransaction
    }
  }
}
