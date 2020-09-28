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

import { json } from 'body-parser'
import { Router } from 'express'
import { BadRequest, Conflict } from 'http-errors'
import { Database } from '../database'
import { addPurchase } from '../function/purchase'
import { getStatusMessage, setStatusMessage } from '../function/statusmessage'
import { EventHandler } from '../monitoring/eventhandler'
import { generatePurchaseId } from '../util/token'
import { WebsocketApi } from '../websocket'

export const createAdminRouter = ({ database, websocket, eventHandler }: {
  database: Database
  websocket: WebsocketApi
  eventHandler: EventHandler
}) => {
  const router = Router()

  router.get('/status', async (_, res, next) => {
    try {
      res.json({
        websocketClients: websocket.countConnections(),
        counters: await eventHandler.getCounters()
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/reset-counters', async (_, res, next) => {
    try {
      await eventHandler.resetCounters()

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.get('/status-message', async (_, res, next) => {
    try {
      const currentStatusMessage = await getStatusMessage({ database })

      res.json({
        statusMessage: currentStatusMessage
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/status-message', json(), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.message !== 'string') {
        throw new BadRequest()
      }

      const newStatusMessage = req.body.message as string

      await setStatusMessage({ database, newStatusMessage })

      websocket.triggerImportantSyncAtAllDevicesInBackground()

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/unlock-premium', json(), async (req, res, next) => {
    try {
      if (typeof req.body !== 'object' || typeof req.body.mail !== 'string' || typeof req.body.duration !== 'string') {
        throw new BadRequest()
      }

      const mail: string = req.body.mail
      const type: string = req.body.duration

      if (type !== 'month' && type !== 'year' || mail === '') {
        throw new BadRequest()
      }

      await database.transaction(async (transaction) => {
        const userEntryUnsafe = await database.user.findOne({
          where: {
            mail
          },
          attributes: ['familyId'],
          transaction
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
          websocket,
          transaction
        })
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
