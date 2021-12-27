/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2021 Jonas Lochmann
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
import { ParentPassword } from '../../api/schema'
import { Database } from '../../database'
import { generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { requireMailByAuthToken } from '../authentication'
import { notifyClientsAboutChangesDelayed } from '../websocket'

export const recoverParentPassword = async ({ database, websocket, password, mailAuthToken }: {
  database: Database
  websocket: WebsocketApi
  password: ParentPassword
  mailAuthToken: string
  // no transaction here because this is directly called from an API endpoint
}) => {
  await database.transaction(async (transaction) => {
    const mail = await requireMailByAuthToken({ mailAuthToken, database, transaction, invalidate: true })

    // update the user entry
    const userEntry = await database.user.findOne({
      where: {
        mail
      },
      transaction
    })

    if (!userEntry) {
      throw new Conflict()
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

    await notifyClientsAboutChangesDelayed({
      database,
      familyId: userEntry.familyId,
      websocket,
      isImportant: true,
      sourceDeviceId: null,
      transaction
    })
  })
}
