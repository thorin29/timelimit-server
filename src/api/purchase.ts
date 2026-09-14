/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
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
import { BadRequest } from 'http-errors'
import { SimpleDatabase } from '../database/simple'
import {
  canDoNextPurchase,
  requireFamilyEntry
} from '../function/purchase'
import { isCanDoPurchaseRequest } from './validator'

export const createPurchaseRouter = ({ database }: { database: SimpleDatabase }) => {
  const router = Router()

  router.post('/can-do-purchase', json(), async (req, res, next) => {
    try {
      if (!isCanDoPurchaseRequest(req.body)) {
        throw new BadRequest()
      }

      const result: boolean = await database.transaction(async (transaction) => {
        const familyEntry = await requireFamilyEntry({
          transaction,
          deviceAuthToken: req.body.deviceAuthToken,
        })

        return canDoNextPurchase({
          fullVersionUntil: parseInt(familyEntry.fullVersionUntil, 10),
          fullVersionDebts: parseInt(familyEntry.fullVersionDebts, 10),
        })
      })

      res.json({
        canDoPurchase: result ? 'yes' : 'no due to old purchase'
      })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
