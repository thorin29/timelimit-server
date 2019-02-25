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

import { Conflict, Unauthorized } from 'http-errors'
import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { requireMailByAuthToken } from '../authentication'
import { notifyClientsAboutChanges } from '../websocket'

export const linkMailAddress = async ({ mailAuthToken, deviceAuthToken, parentUserId, parentPasswordSecondHash, database, websocket }: {
  mailAuthToken: string
  deviceAuthToken: string
  parentUserId: string
  parentPasswordSecondHash: string
  database: Database
  websocket: WebsocketApi
}) => {
  const deviceEntry = await database.device.findOne({
    where: {
      deviceAuthToken
    }
  })

  if (!deviceEntry) {
    throw new Unauthorized()
  }

  const familyId = deviceEntry.familyId

  const mailAddress = await requireMailByAuthToken({ mailAuthToken, database })

  const exisitingUser = await database.user.findOne({
    where: {
      mail: mailAddress
    }
  })

  if (exisitingUser) {
    throw new Conflict()
  }

  await database.transaction(async (transaction) => {
    const parentEntry = await database.user.findOne({
      where: {
        type: 'parent',
        familyId,
        userId: parentUserId
      },
      transaction,
      lock: Sequelize.Transaction.LOCK.UPDATE
    })

    if (!parentEntry) {
      throw new Conflict()
    }

    if (parentEntry.mail !== '') {
      throw new Conflict()
    }

    if (parentEntry.secondPasswordHash !== parentPasswordSecondHash) {
      throw new Conflict()
    }

    if (!parentEntry.secondPasswordSalt) {
      throw new Conflict()
    }

    parentEntry.mail = mailAddress

    await parentEntry.save({ transaction })

    // invalidiate client caches
    await database.family.update({
      userListVersion: generateVersionId()
    }, {
      where: {
        familyId
      },
      transaction
    })
  })

  await notifyClientsAboutChanges({
    familyId,
    sourceDeviceId: null,
    database,
    websocket,
    isImportant: true
  })
}
