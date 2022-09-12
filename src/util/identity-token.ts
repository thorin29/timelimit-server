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

import { SignJWT } from 'jose'
import { config } from '../config'

export async function createIdentityToken({ purpose, familyId, userId, mail }: {
  purpose: string
  familyId: string
  userId: string
  mail: string
}) {
  if (config.signSecret === '') throw new MissingSignSecretException()

  const jwt = await new SignJWT({ purpose, familyId, userId, mail })
    .setExpirationTime('7d')
    .setProtectedHeader({ alg: 'HS512' })
    .sign(Buffer.from(config.signSecret, 'utf8'))

  return Buffer.from(jwt, 'ascii')
    .toString('base64')
    .split(/(.{32})/)
    .filter((item) => item.length > 0)
    .join('\n')
}

export class MissingSignSecretException extends Error {}
