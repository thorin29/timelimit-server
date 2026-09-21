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
    updateDeviceListVersion: (params: { familyId: string, deviceListVersion: string }) => Promise<void>
    updateUserListVersion: (params: { familyId: string, userListVersion: string }) => Promise<void>
    updateU2fKeysVersion: (params: { familyId: string, u2fKeysVersion: string }) => Promise<void>
  }

  device: {
    getFamilyIdByAuthToken: (deviceAuthToken: string) => Promise<string | null>
    getFamilyIdAndDeviceNameByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceName: string} | null>
    getFamilyIdAndDeviceIdByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string} | null>
    getFamilyIdAndCurrentUserByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, currentUserId: string } | null>
    getFamilyIdAndDeviceIdAndCurrentUserAndKeptSignedInByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string, currentUserId: string, isUserKeptSignedIn: boolean} | null>
    getFamilyIdAndDeviceIdAndLastConnectivityByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceId: string, lastConnectivity: number} | null>
    getDeviceAuthTokensByDeviceId: (params: { familyId: string, deviceId: string }) => Promise<{ deviceAuthToken: string } | null>
    getDeviceIdsByCurrentUserId: (params: { familyId: string, currentUserId: string }) => Promise<Array<string>>
    getDeviceIdsAndAuthTokensByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, deviceAuthToken: string }>>
    getDeviceIdsAndShowDeviceConnectedByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, showDeviceConnected: boolean }>>
    updateLastConnectivityByDeviceAuthToken: (params: { deviceAuthToken: string, lastConnectivity: number }) => Promise<void>
  }

  oldDevice: {
    hasAuthToken: (deviceAuthToken: string) => Promise<boolean>
  }

  user: {
    doesFamilyHaveUserWithMail: (params: { familyId: string, mail: string }) => Promise<boolean>
    doesSpecificParentUserExist: (params: { familyId: string, userId: string, mail: string }) => Promise<boolean>
    getSmallestMailAddressByFamilyId: (familyId: string) => Promise<string | null>
    getMailAddressByUserId: (params: { familyId: string, userId: string }) => Promise<string> // returns the empty string if the user was not found
    getCurrentDeviceIdByUserId: (params: { familyId: string, userId: string }) => Promise<{ currentDeviceId: string } | null>
    doesParentUserExist: (params: { familyId: string, userId: string }) => Promise<boolean>
    doesParentUserWithSpecificSecondPasswordHashExist: (params: { familyId: string, userId: string, secondPasswordHash: string }) => Promise<boolean>
    updateCurrentDevice: (params: { familyId: string, userId: string, currentDeviceId: string }) => Promise<void>
  }

  mailLoginToken: {
    create: (params: { time: number, mail: string, code: string, locale: string }) => Promise<{ token: string }>
    query: (token: string) => Promise<{ mail: string, code: string, locale: string, remainingAttempts: number } | null>
    updateRemainingAttempts: (token: string, attempts: number) => Promise<{ found: boolean }>
    destroy: (token: string) => Promise<{ found: boolean }>
  }

  authToken: {
    create: (params: { time: number, mail: string, locale: string }) => Promise<string>
    checkAndKeep: (token: string) => Promise<{ mail: string, locale: string } | null>
    checkAndDestroy: (token: string) => Promise<{ mail: string, locale: string } | null>
  }

  addDeviceToken: {
    create: (params: { familyId: string, time: number, deviceId: string, token: string }) => Promise<void>
    getAndDestroy: (token: string) => Promise<{familyId: string, deviceId: string} | null>
    destroyByFamilyId: (familyId: string) => Promise<void>
    destroyOlderThan: (time: number) => Promise<void>
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
      },
      updateDeviceListVersion: async ({ familyId, deviceListVersion}) => {
        await database.family.update({
          deviceListVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      updateUserListVersion: async ({ familyId, userListVersion }) => {
        await database.family.update({
          userListVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      updateU2fKeysVersion: async ({ familyId, u2fKeysVersion }) => {
        await database.family.update({
          u2fKeysVersion
        }, {
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
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
      getFamilyIdAndCurrentUserByAuthToken: async (deviceAuthToken: string) => {
        const item = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'currentUserId'],
          transaction: legacyTransaction
        })

        if (item) {
          return {
            familyId: item.familyId,
            currentUserId: item.currentUserId
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
      getFamilyIdAndDeviceIdAndLastConnectivityByAuthToken: async (deviceAuthToken: string) => {
        const deviceEntry = await database.device.findOne({
          where: { deviceAuthToken },
          attributes: ['familyId', 'deviceId', 'lastConnectivity'],
          transaction: legacyTransaction
        })

        if (deviceEntry) {
          return {
            familyId: deviceEntry.familyId,
            deviceId: deviceEntry.deviceId,
            lastConnectivity: parseInt(deviceEntry.lastConnectivity)
          }
        } else return null
      },
      getDeviceAuthTokensByDeviceId: async ({ familyId, deviceId }) => {
        const item = await database.device.findOne({
          where: {
            familyId,
            deviceId
          },
          attributes: ['deviceAuthToken'],
          transaction: legacyTransaction
        })

        if (item) {
          return {
            deviceAuthToken: item.deviceAuthToken
          }
        } else return null
      },
      getDeviceIdsByCurrentUserId: async ({ familyId, currentUserId }) => {
        const items = await database.device.findAll({
          where: {
            familyId,
            currentUserId
          },
          transaction: legacyTransaction,
          attributes: ['deviceId']
        })

        return items.map((item) => item.deviceId)
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
      getDeviceIdsAndShowDeviceConnectedByFamilyId: async (familyId: string) => {
        const items = await database.device.findAll({
          where: {
            familyId
          },
          attributes: [
            'deviceId',
            'showDeviceConnected'
          ],
          transaction: legacyTransaction
        })

        return items.map(({ deviceId, showDeviceConnected }) => ({
          deviceId, showDeviceConnected
        }))
      },
      updateLastConnectivityByDeviceAuthToken: async ({ deviceAuthToken, lastConnectivity }) => {
        await database.device.update({
          lastConnectivity: lastConnectivity.toString(10)
        }, {
          where: {
            deviceAuthToken
          },
          transaction: legacyTransaction
        })
      },
    },
    oldDevice: {
      hasAuthToken: async (deviceAuthToken) => {
        const item = await database.oldDevice.findOne({
          where: {
            deviceAuthToken
          },
          transaction: legacyTransaction
        })

        return !!item
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
      getCurrentDeviceIdByUserId: async ({ familyId, userId }) => {
        const item = await database.user.findOne({
          where: {
            familyId,
            userId,
          },
          transaction: legacyTransaction,
          attributes: ['currentDevice']
        })

        if (item) {
          return {
            currentDeviceId: item.currentDevice || ''
          }
        } else return null
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
      updateCurrentDevice: async ({ familyId, userId, currentDeviceId }) => {
        await database.user.update({
          currentDevice: currentDeviceId
        }, {
          where: {
            familyId,
            userId
          },
          transaction: legacyTransaction
        })
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
    authToken: {
      create: async ({ time, mail, locale }) => {
        const token = generateAuthToken()

        await database.authtoken.create({
          token,
          mail,
          createdAt: time.toString(),
          locale
        }, { transaction: legacyTransaction })

        return token
      },
      checkAndKeep: async (token: string) => {
        const item = await database.authtoken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            mail: item.mail,
            locale: item.locale
          }
        } else return null
      },
      checkAndDestroy: async (token: string) => {
        const item = await database.authtoken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          const counter = await database.authtoken.destroy({
            where: {
              token
            },
            transaction: legacyTransaction
          })

          if (counter !== 1) {
            return null
          }

          return {
            mail: item.mail,
            locale: item.locale
          }
        } else return null
      },
    },
    addDeviceToken: {
      create: async ({ familyId, time, deviceId, token }) => {
        await database.addDeviceToken.create({
          familyId,
          token,
          deviceId,
          createdAt: time.toString()
        }, { transaction: legacyTransaction })
      },
      getAndDestroy: async (token: string) => {
        const item = await database.addDeviceToken.findOne({
          where: {
            token
          },
          transaction: legacyTransaction
        })

        if (item) {
          return {
            familyId: item.familyId,
            deviceId: item.deviceId,
          }
        } else return null
      },
      destroyByFamilyId: async (familyId: string) => {
        await database.addDeviceToken.destroy({
          where: {
            familyId
          },
          transaction: legacyTransaction
        })
      },
      destroyOlderThan: async (time: number) => {
        await database.addDeviceToken.destroy({
          where: {
            createdAt: {
              [Sequelize.Op.lt]: time.toString()
            }
          },
          transaction: legacyTransaction
        })
      },
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
