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

import * as Sequelize from 'sequelize'
import { Database } from '../../database'

export async function deleteFamilies ({ database, familiyIds }: {
  database: Database
  familiyIds: Array<string>
}) {
  if (familiyIds.length === 0) {
    return
  }

  await database.transaction(async (transaction) => {
    // app
    await database.app.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // app activity
    await database.appActivity.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // category
    await database.category.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // categoryapp
    await database.categoryApp.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // purchase
    await database.purchase.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // timelimitrule
    await database.timelimitRule.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // usedtime
    await database.usedTime.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // user
    await database.user.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // device
    const oldDeviceAuthTokens = await database.device.findAll({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      attributes: ['deviceAuthToken'],
      transaction
    }).map((item) => item.deviceAuthToken)

    await database.device.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })

    // olddevice
    if (oldDeviceAuthTokens.length > 0) {
      await database.oldDevice.bulkCreate(
        oldDeviceAuthTokens.map((item) => ({
          deviceAuthToken: item
        }))
      )
    }

    // family
    await database.family.destroy({
      where: {
        familyId: {
          [Sequelize.Op.in]: familiyIds
        }
      },
      transaction
    })
  })
}
