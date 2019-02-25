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

import { json } from 'body-parser'
import { Router } from 'express'
import { BadRequest, Conflict, Unauthorized } from 'http-errors'
import { Database } from '../database'
import {
  addPurchase,
  areGooglePlayPaymentsPossible,
  canDoNextPurchase,
  isGooglePlayPurchaseSignatureValid,
  requireFamilyEntry
} from '../function/purchase'
import { WebsocketApi } from '../websocket'
import { isCanDoPurchaseRequest, isFinishPurchaseByGooglePlayRequest } from './validator'

export const createPurchaseRouter = ({ database, websocket }: {
  database: Database
  websocket: WebsocketApi
}) => {
  const router = Router()

  router.post('/can-do-purchase', json(), async (req, res, next) => {
    if (!areGooglePlayPaymentsPossible) {
      res.json({ canDoPurchase: 'no because not supported by the server' })
      return
    }

    try {
      if (!isCanDoPurchaseRequest(req.body)) {
        throw new BadRequest()
      }

      const familyEntry = await requireFamilyEntry({
        database,
        deviceAuthToken: req.body.deviceAuthToken
      })

      const result = canDoNextPurchase({ fullVersionUntil: parseInt(familyEntry.fullVersionUntil, 10) })

      res.json({
        canDoPurchase: result ? 'yes' : 'no due to old purchase'
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/finish-purchase-by-google-play', json(), async (req, res, next) => {
    try {
      if (!isFinishPurchaseByGooglePlayRequest(req.body)) {
        throw new BadRequest()
      }

      const deviceEntryUnsafe = await database.device.findOne({
        where: {
          deviceAuthToken: req.body.deviceAuthToken
        },
        attributes: ['familyId']
      })

      if (!deviceEntryUnsafe) {
        throw new Unauthorized()
      }

      const deviceEntry = {
        familyId: deviceEntryUnsafe.familyId
      }

      if (!isGooglePlayPurchaseSignatureValid({
        receipt: req.body.receipt,
        signature: req.body.signature
      })) {
        throw new Conflict()
      }

      const receipt = JSON.parse(req.body.receipt)

      if (typeof receipt !== 'object') {
        throw new Conflict()
      }

      let type: 'month' | 'year'

      if (receipt.productId === 'premium_year_2018') {
        type = 'year'
      } else if (receipt.productId === 'premium_month_2018') {
        type = 'month'
      } else {
        throw new Conflict()
      }

      const orderId = receipt.orderId

      if (typeof orderId !== 'string') {
        throw new Conflict()
      }

      await addPurchase({
        database,
        familyId: deviceEntry.familyId,
        type,
        transactionId: orderId,
        websocket
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
