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

  device: {
    getFamilyIdAndDeviceNameByAuthToken: (deviceAuthToken: string) => Promise<{familyId: string, deviceName: string} | null>
    getDeviceIdsAndAuthTokensByFamilyId: (familyId: string) => Promise<Array<{ deviceId: string, deviceAuthToken: string }>>
  }

  user: {
    doesFamilyHaveUserWithMail: (params: { familyId: string, mail: string }) => Promise<boolean>
  }

  mailLoginToken: {
    create: (params: { time: number, mail: string, code: string, locale: string }) => Promise<{ token: string }>
    query: (token: string) => Promise<{ mail: string, code: string, locale: string, remainingAttempts: number } | null>
    updateRemainingAttempts: (token: string, attempts: number) => Promise<{ found: boolean }>
    destroy: (token: string) => Promise<{ found: boolean }>
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
    device: {
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
      }
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
    enqueueAfterCommit: (afterCommitAction) => legacyTransaction.afterCommit(afterCommitAction),
    legacy: {
      database,
      transaction: legacyTransaction
    }
  }
}
