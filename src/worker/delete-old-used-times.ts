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

import { uniqBy } from 'lodash'
import * as Sequelize from 'sequelize'
import { Database } from '../database'
import { generateVersionId } from '../util/token'

export function initDeleteOldUsedTimesWorker ({ database }: {
  database: Database
}) {
  function doWorkSafe () {
    deleteOldUsedTimes({ database }).catch((ex) => {
      console.warn('error deleting old used times', ex)
    })
  }

  setTimeout(() => {
    doWorkSafe()

    setInterval(() => {
      doWorkSafe()
    }, 1000 * 60 * 30 /* every 30 minutes */)
  }, 1000 * 60 * 13 /* after 13 minutes */)
}

async function deleteOldUsedTimes ({ database }: {
  database: Database
}) {
  const now = Date.now()

  await database.transaction(async (transaction) => {
    // get matching categories
    const categoriesToCleanUp = await database.usedTime.findAll({
      transaction,
      where: {
        lastUpdate: {
          [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 10 /* 10 days */).toString()
        }
      },
      attributes: [
        'familyId',
        'categoryId'
      ],
      limit: 100
    }).map((item) => ({
      familyId: item.familyId,
      categoryId: item.categoryId
    }))

    const distinctCategoriesToCleanUp = uniqBy(categoriesToCleanUp, (item) => item.familyId + '_' + item.categoryId)

    if (distinctCategoriesToCleanUp.length > 0) {
      // delete old items of matching categories
      await database.usedTime.destroy({
        transaction,
        where: {
          [Sequelize.Op.or]: (
            distinctCategoriesToCleanUp
          ),
          lastUpdate: {
            [Sequelize.Op.lt]: (now - 1000 * 60 * 60 * 24 * 10 /* 10 days */).toString()
          }
        }
      })

      // invalidiate categories
      await database.category.update({
        usedTimesVersion: generateVersionId()
      }, {
        transaction,
        where: {
          [Sequelize.Op.or]: (
            distinctCategoriesToCleanUp
          )
        }
      })
    }
  })
}
