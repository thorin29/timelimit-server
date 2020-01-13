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

import { urlencoded } from 'body-parser'
import * as escape from 'escape-html'
import { Router } from 'express'
import { BadRequest, Conflict } from 'http-errors'
import { Database } from '../database'
import { addPurchase } from '../function/purchase'
import { getStatusMessage, setStatusMessage } from '../function/statusmessage'
import { generatePurchaseId } from '../util/token'
import { WebsocketApi } from '../websocket'

export const createAdminRouter = ({ database, websocket }: {
  database: Database
  websocket: WebsocketApi
}) => {
  const router = Router()

  router.get('/status', (_, res) => {
    res.json({
      websocketClients: websocket.countConnections()
    })
  })

  router.get('/status-message', async (_, res, next) => {
    try {
      const currentStatusMessage = await getStatusMessage({ database })

      res.send('<html><body><form action="/admin/status-message" method="post"><textarea name="smessage" rows="20" cols="100">' + escape(currentStatusMessage) + '</textarea><input type="submit" value="Save"></form></body></html>')
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/status-message', urlencoded({ extended: false }), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.smessage !== 'string') {
        throw new BadRequest()
      }

      const newStatusMessage = req.body.smessage as string

      await setStatusMessage({ database, newStatusMessage })

      websocket.triggerImportantSyncAtAllDevicesInBackground()

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.get('/unlock-premium', (_, res) => (
    res.send('<html><body><form action="/admin/unlock-premium" method="post">mail: <input name="mail" /><br><input type="radio" name="duration" value="month" />Month<br /><input type="radio" name="duration" value="year" />Year<br><input type="submit" value="Unlock"></form></body></html>')
  ))

  router.post('/unlock-premium', urlencoded({ extended: false }), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.mail !== 'string' || typeof req.body.duration !== 'string') {
        throw new BadRequest()
      }

      const mail: string = req.body.mail
      const type: string = req.body.duration

      if (type !== 'month' && type !== 'year') {
        throw new BadRequest()
      }

      const userEntryUnsafe = await database.user.findOne({
        where: {
          mail
        },
        attributes: ['familyId']
      })

      if (!userEntryUnsafe) {
        throw new Conflict('no user with specified mail address')
      }

      const userEntry = {
        familyId: userEntryUnsafe.familyId
      }

      await addPurchase({
        database,
        familyId: userEntry.familyId,
        type,
        transactionId: 'manual-' + type + '-' + generatePurchaseId(),
        websocket
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
