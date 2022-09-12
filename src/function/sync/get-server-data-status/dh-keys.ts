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
import { Database } from '../../../database'
import { config, calculateExpireTime } from '../../../database/devicedhkey'
import { ServerDhKey } from '../../../object/serverdatastatus'
import { generateVersionId } from '../../../util/token'
import { EventHandler } from '../../../monitoring/eventhandler'
import { generateDhKeypair } from '../../../function/dh'
import { FamilyEntry } from './family-entry'

export async function getDeviceDhKeys ({
  database, transaction, familyEntry, deviceId, lastVersionId, eventHandler
}: {
  database: Database
  transaction: Sequelize.Transaction
  familyEntry: FamilyEntry
  deviceId: string
  lastVersionId: string | null
  eventHandler: EventHandler
}): Promise<ServerDhKey | null> {
  const savedData = await database.deviceDhKey.findAll({
    where: {
      familyId: familyEntry.familyId,
      deviceId
    },
    transaction
  })

  const now = BigInt(Date.now())
  const oldCurrentKey = savedData.find((item) => item.expireAt === null)
  const needsNewKey =
    oldCurrentKey === undefined ||
    BigInt(oldCurrentKey.createdAt) + BigInt(config.generateNewKeyAfterAge) <= now ||
    BigInt(oldCurrentKey.createdAt) > now

  if (needsNewKey) {
    eventHandler.countEvent('getDeviceDhKeys:needsNewKey')

    const newVersion = generateVersionId()
    const newKeypair = await generateDhKeypair()

    if (savedData.length >= 8) {
      eventHandler.countEvent('getDeviceDhKeys:gc')

      const minCreatedAtValue = savedData.map((item) => BigInt(item.createdAt)).sort()[0]

      await database.deviceDhKey.destroy({
        where: {
          familyId: familyEntry.familyId,
          deviceId,
          createdAt: {
            [Sequelize.Op.lte]: minCreatedAtValue.toString(10)
          }
        },
        transaction
      })
    }

    await database.deviceDhKey.update({
      expireAt: calculateExpireTime(now).toString(10)
    }, {
      where: {
        familyId: familyEntry.familyId,
        deviceId,
        expireAt: null
      },
      transaction
    })

    await database.deviceDhKey.create({
      familyId: familyEntry.familyId,
      deviceId,
      version: newVersion,
      createdAt: (now - now % BigInt(config.generationTimeRounding)).toString(10),
      expireAt: null,
      publicKey: newKeypair.publicKey,
      privateKey: newKeypair.privateKey
    }, { transaction })

    return {
      k: newKeypair.publicKey.toString('base64'),
      v: newVersion
    }
  } else {
    if (lastVersionId === oldCurrentKey.version) return null
    else return {
      k: oldCurrentKey.publicKey.toString('base64'),
      v: oldCurrentKey.version
    }
  }
}
