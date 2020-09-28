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

import { createHash } from 'crypto'
import { ClientPushChangesRequestAction } from '../../../api/schema'
import { Cache } from './cache'
import {
  InvalidChildActionIntegrityValue, InvalidParentActionIntegrityValue, ParentDeviceActionWithoutParentDeviceException
} from './exception/integrity'

export async function assertActionIntegrity ({ action, cache, deviceId }: {
  action: ClientPushChangesRequestAction
  cache: Cache
  deviceId: string
}): Promise<{ isChildLimitAdding: boolean }> {
  let isChildLimitAdding = false

  if (action.type === 'parent') {
    if (action.integrity === 'device') {
      const deviceEntryUnsafe = await cache.database.device.findOne({
        attributes: ['currentUserId'],
        where: {
          familyId: cache.familyId,
          deviceId,
          currentUserId: action.userId,
          isUserKeptSignedIn: true
        },
        transaction: cache.transaction
      })

      if (!deviceEntryUnsafe) {
        throw new ParentDeviceActionWithoutParentDeviceException()
      }

      // this ensures that the parent exists
      await cache.getSecondPasswordHashOfParent(action.userId)
    } else if (action.integrity === 'childDevice') {
      // will be checked later
      isChildLimitAdding = true
    } else {
      const parentSecondHash = await cache.getSecondPasswordHashOfParent(action.userId)

      const integrityData = action.sequenceNumber.toString(10) +
                  deviceId +
                  parentSecondHash +
                  action.encodedAction

      const expectedIntegrityValue = createHash('sha512').update(integrityData).digest('hex')

      if (action.integrity !== expectedIntegrityValue) {
        throw new InvalidParentActionIntegrityValue()
      }
    }
  }

  if (action.type === 'child') {
    const childSecondHash = await cache.getSecondPasswordHashOfChild(action.userId)

    const integrityData = action.sequenceNumber.toString(10) +
                deviceId +
                childSecondHash +
                action.encodedAction

    const expectedIntegrityValue = createHash('sha512').update(integrityData).digest('hex')

    if (action.integrity !== expectedIntegrityValue) {
      throw new InvalidChildActionIntegrityValue()
    }
  }

  return { isChildLimitAdding }
}
