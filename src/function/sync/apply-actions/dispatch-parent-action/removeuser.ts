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

import { createHash } from 'crypto'
import { InternalServerError } from 'http-errors'
import * as Sequelize from 'sequelize'
import { RemoveUserAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchRemoveUser ({ action, cache, parentUserId }: {
  action: RemoveUserAction
  cache: Cache
  parentUserId: string
}) {
  const user = await cache.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.userId
    },
    transaction: cache.transaction
  })

  if (!user) {
    throw new Error('invalid user id')
  }

  if (user.type === 'parent') {
    if (!parentUserId) {
      throw new InternalServerError()
    }

    if (parentUserId === action.userId) {
      throw new Error('users can not delete themself')
    }

    const expectedIntegrityValue = createHash('sha512').update(
      action.userId + user.secondPasswordHash + 'remove'
    ).digest('hex').substring(0, 16)

    if (expectedIntegrityValue !== action.authentication) {
      throw new Error('invalid authentication value')
    }

    if (user.mail !== '') {
      const usersWithLinkedMail = await cache.database.user.count({
        transaction: cache.transaction,
        where: {
          familyId: cache.familyId,
          type: 'parent',
          mail: {
            [Sequelize.Op.not]: ''
          }
        }
      })

      if (usersWithLinkedMail <= 1) {
        throw new Error('this user is the last one with a linked mail address')
      }
    }
  }

  if (user.type === 'child') {
    const categories = await cache.database.category.findAll({
      where: {
        familyId: cache.familyId,
        childId: action.userId
      },
      transaction: cache.transaction,
      lock: Sequelize.Transaction.LOCK.UPDATE
    })

    await cache.database.categoryApp.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction
    })

    await cache.database.timelimitRule.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction
    })

    await cache.database.usedTime.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction
    })

    await cache.database.category.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categories.map((category) => category.categoryId)
        }
      },
      transaction: cache.transaction
    })
  }

  const [updatedDevices1] = await cache.database.device.update({
    currentUserId: '',
    isUserKeptSignedIn: false
  }, {
    where: {
      familyId: cache.familyId,
      currentUserId: action.userId
    },
    transaction: cache.transaction
  })

  const [updatedDevices2] = await cache.database.device.update({
    defaultUserId: ''
  }, {
    where: {
      familyId: cache.familyId,
      defaultUserId: action.userId
    },
    transaction: cache.transaction
  })

  if (updatedDevices1 > 0 || updatedDevices2 > 0) {
    cache.invalidiateDeviceList = true
  }

  await user.destroy({ transaction: cache.transaction })

  cache.invalidiateUserList = true
  cache.areChangesImportant = true

  cache.doesUserExist.cache.set(action.userId, false)
  cache.getSecondPasswordHashOfParent.cache.delete(action.userId)
}
