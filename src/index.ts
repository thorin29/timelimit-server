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

import { Server } from 'http'
import { createApi } from './api'
import { VisibleConnectedDevicesManager } from './connected-devices'
import { defaultDatabase, defaultUmzug } from './database'
import { createWebsocketHandler } from './websocket'
import { initWorkers } from './worker'

async function main () {
  await defaultUmzug.up()
  const database = defaultDatabase

  const connectedDevicesManager = new VisibleConnectedDevicesManager({
    database
  })

  const { websocketApi, websocketServer } = createWebsocketHandler({
    database,
    connectedDevicesManager
  })

  initWorkers({
    websocket: websocketApi,
    database
  })

  const api = createApi({
    database,
    websocket: websocketApi,
    connectedDevicesManager
  })

  const server = new Server(api)

  websocketServer.attach(server, {
    serveClient: false
  })

  server.listen(process.env.PORT || 8080)

  console.log('ready')
}

main().catch((ex) => {
  console.warn(ex)
  process.exit(1)
})
