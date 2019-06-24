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

import { Router } from 'express'
import { Database } from '../database'
import { WebsocketApi } from '../websocket'
import { setStatusMessage, getStatusMessage } from '../function/statusmessage'
import * as escape from 'escape-html'
import { json } from 'body-parser'
import { BadRequest } from 'http-errors'

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

      res.send('<html><body><form action="/admin/status-message" method="post"><textarea>' + escape(currentStatusMessage) + '</textarea><input type="submit" value="Save"></form></body></html>')
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/status-message', json(), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.smessage !== 'string') {
        throw new BadRequest()
      }

      const newStatusMessage = req.body.smessage as string

      await setStatusMessage({ database, newStatusMessage })

      websocket.triggerImportantSyncAtAllDevicesInBackground()

      res.json({ok: true})
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
