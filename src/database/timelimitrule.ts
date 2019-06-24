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
import { booleanColumn, familyIdColumn, idWithinFamilyColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface TimelimitRuleAttributes {
  familyId: string
  ruleId: string
  categoryId: string
  applyToExtraTimeUsage: boolean
  dayMaskAsBitmask: number
  maximumTimeInMillis: number
}

export type TimelimitRuleModel = Sequelize.Model & TimelimitRuleAttributes
export type TimelimitRuleModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): TimelimitRuleModel;
}

export const attributes: SequelizeAttributes<TimelimitRuleAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  ruleId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  categoryId: { ...idWithinFamilyColumn },
  applyToExtraTimeUsage: { ...booleanColumn },
  dayMaskAsBitmask: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1 | 2 | 4 | 8 | 16 | 32 | 64
    }
  },
  maximumTimeInMillis: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}

export const createTimelimitRuleModel = (sequelize: Sequelize.Sequelize): TimelimitRuleModelStatic => sequelize.define('TimelimitRule', attributes) as TimelimitRuleModelStatic
