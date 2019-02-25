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

import { Conflict } from 'http-errors'
import * as Sequelize from 'sequelize'
import { ParentPassword } from '../../api/schema'
import { Database } from '../../database'
import { generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { requireMailByAuthToken } from '../authentication'
import { notifyClientsAboutChanges } from '../websocket'

export const recoverParentPassword = async ({ database, websocket, password, mailAuthToken }: {
  database: Database
  websocket: WebsocketApi
  password: ParentPassword
  mailAuthToken: string
}) => {
  const mail = await requireMailByAuthToken({ mailAuthToken, database })

  const { familyId } = await database.transaction(async (transaction) => {
    // update the user entry
    const userEntry = await database.user.findOne({
      where: {
        mail
      },
      transaction,
      lock: Sequelize.Transaction.LOCK.UPDATE
    })

    if (!userEntry) {
      return { familyId: null }
    }

    userEntry.passwordHash = password.hash
    userEntry.secondPasswordHash = password.secondHash
    userEntry.secondPasswordSalt = password.secondSalt

    await userEntry.save({ transaction })

    // invalidate the user list
    await database.family.update({
      userListVersion: generateVersionId()
    }, {
      where: {
        familyId: userEntry.familyId
      },
      transaction
    })

    return { familyId: userEntry.familyId }
  })

  if (familyId === null) {
    throw new Conflict()
  }

  await notifyClientsAboutChanges({
    database,
    familyId,
    websocket,
    isImportant: true,
    sourceDeviceId: null
  })
}
