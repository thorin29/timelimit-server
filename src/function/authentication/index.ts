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

import { Unauthorized } from 'http-errors'
import { Database, Transaction } from '../../database'
import { generateAuthToken } from '../../util/token'

export const createAuthTokenByMailAddress = async ({ mail, database, transaction }: { mail: string, database: Database, transaction: Transaction }) => {
  const token = generateAuthToken()

  await database.authtoken.create({
    token,
    mail,
    createdAt: Date.now().toString()
  }, { transaction })

  return token
}

export const getMailByAuthToken = async ({ mailAuthToken, database, transaction }: { mailAuthToken: string, database: Database, transaction: Transaction }) => {
  const entry = await database.authtoken.findOne({
    where: {
      token: mailAuthToken
    },
    transaction
  })

  if (entry) {
    return entry.mail
  } else {
    return null
  }
}

export const requireMailByAuthToken = async ({ mailAuthToken, database, transaction }: { mailAuthToken: string, database: Database, transaction: Transaction }) => {
  const mail = await getMailByAuthToken({ mailAuthToken, database, transaction })

  if (!mail) {
    throw new Unauthorized()
  }

  return mail
}
