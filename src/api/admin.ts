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

import { urlencoded } from 'body-parser'
import * as escape from 'escape-html'
import { Router } from 'express'
import { BadRequest } from 'http-errors'
import { Database } from '../database'
import { getStatusMessage, setStatusMessage } from '../function/statusmessage'
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

  return router
}
