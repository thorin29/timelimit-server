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

import { Unauthorized } from 'http-errors'
import { Database } from '../../database'
import { generateAuthToken } from '../../util/token'

export const createAuthTokenByMailAddress = async ({ mail, database }: {mail: string, database: Database}) => {
  const token = generateAuthToken()

  await database.authtoken.create({
    token,
    mail,
    createdAt: Date.now().toString()
  })

  return token
}

export const getMailByAuthToken = async ({ mailAuthToken, database }: {mailAuthToken: string, database: Database}) => {
  const entry = await database.authtoken.findOne({
    where: {
      token: mailAuthToken
    }
  })

  if (entry) {
    return entry.mail
  } else {
    return null
  }
}

export const requireMailByAuthToken = async ({ mailAuthToken, database }: {mailAuthToken: string, database: Database}) => {
  const mail = await getMailByAuthToken({ mailAuthToken, database })

  if (!mail) {
    throw new Unauthorized()
  }

  return mail
}
