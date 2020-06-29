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

import { difference } from 'lodash'
import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { deleteFamilies } from './delete-families'

export async function deleteOldFamilies (database: Database) {
  const oldFamilyIds = await findOldFamilyIds(database)

  if (oldFamilyIds.length > 0) {
    const familyIdsToDelete = oldFamilyIds.slice(0, 16) /* limit to 16 families per execution */

    await deleteFamilies({
      database,
      familiyIds: familyIdsToDelete
    })
  }
}

export async function findOldFamilyIds (database: Database) {
  const familyIdsWithExpiredLicenses = await database.family.findAll({
    where: {
      fullVersionUntil: {
        [Sequelize.Op.lt]: (Date.now() - 1000 * 60 * 60 * 24 * 90 /* 90 days */).toString(10)
      }
    },
    attributes: ['familyId']
  }).map((item) => item.familyId)

  if (familyIdsWithExpiredLicenses.length === 0) {
    return []
  }

  const recentlyUsedFamilyIds = await database.device.findAll({
    where: {
      familyId: {
        [Sequelize.Op.in]: familyIdsWithExpiredLicenses
      },
      lastConnectivity: {
        [Sequelize.Op.gt]: (Date.now() - 1000 * 60 * 60 * 24 * 90 /* 90 days */).toString(10)
      }
    },
    attributes: ['familyId']
  }).map((item) => item.familyId)

  return difference(familyIdsWithExpiredLicenses, recentlyUsedFamilyIds)
}
