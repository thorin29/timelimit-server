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
import { BadRequest, Unauthorized } from 'http-errors'
import { VisibleConnectedDevicesManager } from '../connected-devices'
import { Database } from '../database'
import { reportDeviceRemoved } from '../function/device/report-device-removed'
import { applyActionsFromDevice } from '../function/sync/apply-actions'
import { generateServerDataStatus } from '../function/sync/get-server-data-status'
import { WebsocketApi } from '../websocket'
import { isClientPullChangesRequest, isClientPushChangesRequest, isRequestWithAuthToken } from './validator'

const getRoundedTimestampForLastConnectivity = () => {
  const now = Date.now()

  return now - (now % (1000 * 60 * 60 * 12 /* 12 hours */))
}

export const createSyncRouter = ({ database, websocket, connectedDevicesManager }: {
  database: Database
  websocket: WebsocketApi
  connectedDevicesManager: VisibleConnectedDevicesManager
}) => {
  const router = Router()

  router.post('/push-actions', json({
    limit: '500kb'
  }), async (req, res, next) => {
    try {
      if (!isClientPushChangesRequest(req.body)) {
        throw new BadRequest()
      }

      const { shouldDoFullSync } = await applyActionsFromDevice({
        request: req.body,
        database,
        websocket,
        connectedDevicesManager
      })

      res.json({
        shouldDoFullSync
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/pull-status', json(), async (req, res, next) => {
    try {
      const { body } = req

      if (!isClientPullChangesRequest(body)) {
        throw new BadRequest()
      }

      await database.transaction(async (transaction) => {
        const deviceEntryUnsafe = await database.device.findOne({
          where: {
            deviceAuthToken: body.deviceAuthToken
          },
          attributes: ['familyId', 'lastConnectivity'],
          transaction
        })

        if (!deviceEntryUnsafe) {
          throw new Unauthorized()
        }

        const { familyId, lastConnectivity } = deviceEntryUnsafe
        const now = getRoundedTimestampForLastConnectivity()

        if (parseInt(lastConnectivity, 10) !== now) {
          await database.device.update({
            lastConnectivity: now.toString(10)
          }, {
            where: {
              deviceAuthToken: body.deviceAuthToken
            },
            transaction
          })
        }

        const serverStatus = await generateServerDataStatus({
          database,
          familyId,
          clientStatus: body.status,
          transaction
        })

        res.json(serverStatus)
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/report-removed', json(), async (req, res, next) => {
    try {
      if (!isRequestWithAuthToken(req.body)) {
        throw new BadRequest()
      }

      await reportDeviceRemoved({
        database,
        deviceAuthToken: req.body.deviceAuthToken,
        websocket
      })

      res.json({ ok: true })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/is-device-removed', json(), async (req, res, next) => {
    try {
      if (!isRequestWithAuthToken(req.body)) {
        throw new BadRequest()
      }

      const removedEntry = await database.oldDevice.findOne({
        where: {
          deviceAuthToken: req.body.deviceAuthToken
        }
      })

      res.json({
        isDeviceRemoved: !!removedEntry
      })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
