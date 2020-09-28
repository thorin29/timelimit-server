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

import { ClientPushChangesRequestAction } from '../../../../api/schema'
import { EventHandler } from '../../../../monitoring/eventhandler'
import { ApplyActionException } from '../exception/index'
import { EncodedActionSchemaMismatchException } from '../exception/invalidaction'
import { parseEncodedAction } from '../parse-encoded-action'

export async function dispatch<T1 extends { type: string }, T2> ({ type, action, validator, parser, applier, eventHandler }: {
  type: 'app logic' | 'parent' | 'child'
  action: ClientPushChangesRequestAction
  validator: (input: any) => input is T1
  parser: (input: T1) => T2
  applier: (input: T2) => Promise<void>
  eventHandler: EventHandler
}) {
  const parsedSerializedAction = parseEncodedAction(action)

  if (!validator(parsedSerializedAction)) {
    throw new EncodedActionSchemaMismatchException({ type, action: parsedSerializedAction })
  }

  const actionType = parsedSerializedAction.type

  try {
    const parsedAction = parser(parsedSerializedAction)

    await applier(parsedAction)

    eventHandler.countEvent('dispatched action:' + actionType)
  } catch (ex) {
    if (ex instanceof ApplyActionException) {
      throw new ApplyActionException({
        staticMessage: 'error during dispatching ' + actionType + ': ' + ex.staticMessage,
        dynamicMessage: ex.dynamicMessage ? 'error during dispatching ' + actionType + ': ' + ex.dynamicMessage : undefined
      })
    } else throw ex
  }
}
