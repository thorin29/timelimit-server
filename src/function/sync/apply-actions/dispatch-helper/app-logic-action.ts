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

import { parseAppLogicAction } from '../../../../action/serialization'
import { ClientPushChangesRequestAction } from '../../../../api/schema'
import { isSerializedAppLogicAction } from '../../../../api/validator'
import { EventHandler } from '../../../../monitoring/eventhandler'
import { Cache } from '../cache'
import { dispatchAppLogicAction as dispatchAppLogicActionInternal } from '../dispatch-app-logic-action'
import { dispatch } from './helper'

export async function dispatchAppLogicAction ({ action, eventHandler, deviceId, cache }: {
  action: ClientPushChangesRequestAction
  deviceId: string
  cache: Cache
  eventHandler: EventHandler
}) {
  return dispatch({
    action,
    eventHandler,
    type: 'app logic',
    validator: isSerializedAppLogicAction,
    parser: parseAppLogicAction,
    applier: async (action) => {
      await dispatchAppLogicActionInternal({ action, cache, eventHandler, deviceId })
    }
  })
}
