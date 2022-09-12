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
import { createDecipheriv, createPrivateKey, createPublicKey, diffieHellman } from 'crypto'
import { Database } from '../../database'
import { calculateExpireTime } from '../../database/devicedhkey'
import { isVersionId } from '../../util/token'

export async function decrypt({
  database, transaction, familyId, deviceId, encryptedData, authData
}: {
  database: Database
  transaction: Sequelize.Transaction
  familyId: string
  deviceId: string
  encryptedData: string
  authData: Buffer
}) {
  const parts = encryptedData.split('.')

  if (parts.length !== 3) throw new MalformedDataDecryptException('expected three parts')

  const ivAndEncrypted = Buffer.from(parts[0], 'base64')
  const otherPublicKey = Buffer.from(parts[1], 'base64')
  const keyId = parts[2]

  if (ivAndEncrypted.length < 12 + 16) throw new MalformedDataDecryptException('too short for iv and auth tag')

  if (!isVersionId(keyId)) throw new KeyNotFoundDecryptException('invalid key id')

  const databaseKeyEntry = await database.deviceDhKey.findOne({
    where: {
      familyId,
      deviceId,
      version: keyId
    },
    transaction
  })

  if (!databaseKeyEntry) throw new KeyNotFoundDecryptException('private key not found')

  if (databaseKeyEntry.expireAt === null) {
    databaseKeyEntry.expireAt = calculateExpireTime(BigInt(Date.now())).toString(10)
    await databaseKeyEntry.save({ transaction })
  } else {
    if (BigInt(databaseKeyEntry.expireAt) < BigInt(Date.now())) throw new KeyExpiredDecryptException()
  }

  const privateKey = (() => {
    try {
      return createPrivateKey({
        key: databaseKeyEntry.privateKey,
        format: 'der',
        type: 'pkcs8'
      })
    } catch (ex) {
      throw new MalformedPrivateKeyException()
    }
  })()

  const decodedOtherPublicKey = (() => {
    try {
      return createPublicKey({
        key: otherPublicKey,
        format: 'der',
        type: 'spki'
      })
    } catch (ex) {
      throw new MalformedPublicKeyException()
    }
  })()

  const sharedSecret = (() => {
    try {
      return diffieHellman({
        privateKey,
        publicKey: decodedOtherPublicKey
      })
    } catch (ex) {
      throw new MalformedNoMatchingKeysException()
    }
  })()

  try {
    const decipher = createDecipheriv('aes-128-gcm', sharedSecret.slice(0, 16), ivAndEncrypted.slice(0, 12), {
      authTagLength: 16
    })

    decipher.setAuthTag(ivAndEncrypted.slice(ivAndEncrypted.length - 16, ivAndEncrypted.length))
    decipher.setAAD(authData)

    const decryptedData = Buffer.concat([
      decipher.update(ivAndEncrypted.slice(12, ivAndEncrypted.length - 16)),
      decipher.final()
    ])

    return decryptedData
  } catch (ex) {
    throw new MalformedAuthenticationException()
  }
}

export class DecryptException extends Error {}
class MalformedDataDecryptException extends DecryptException { constructor(message: string) { super('malformed data: ' + message) } }
class MalformedPrivateKeyException extends DecryptException { constructor() { super('private key') } }
class MalformedPublicKeyException extends DecryptException { constructor() { super('public key') } }
class MalformedNoMatchingKeysException extends DecryptException { constructor() { super('no matching keys') } }
class MalformedAuthenticationException extends DecryptException { constructor() { super('authentication data') } }
class KeyExpiredDecryptException extends DecryptException { constructor() { super('key expired') } }
class KeyNotFoundDecryptException extends DecryptException { constructor(message: string) { super('key not found: ' + message) } }
