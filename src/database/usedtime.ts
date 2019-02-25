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
import { familyIdColumn, idWithinFamilyColumn, timestampColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface UsedTimeAttributesVersion1 {
  familyId: string
  categoryId: string
  dayOfEpoch: number
  usedTime: number
}

export interface UsedTimeAttributesVersion2 {
  lastUpdate: string
}

export type UsedTimeAttributes = UsedTimeAttributesVersion1 & UsedTimeAttributesVersion2

export type UsedTimeInstance = Sequelize.Instance<UsedTimeAttributes> & UsedTimeAttributes
export type UsedTimeModel = Sequelize.Model<UsedTimeInstance, UsedTimeAttributes>

export const attributesVersion1: SequelizeAttributes<UsedTimeAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  dayOfEpoch: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    primaryKey: true
  },
  usedTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}

export const attributesVersion2: SequelizeAttributes<UsedTimeAttributesVersion2> = {
  lastUpdate: {
    ...timestampColumn,
    defaultValue: 0
  }
}

export const attributes = {
  ...attributesVersion1,
  ...attributesVersion2
}

export const createUsedTimeModel = (sequelize: Sequelize.Sequelize): UsedTimeModel => sequelize.define<UsedTimeInstance, UsedTimeAttributes>('UsedTime', attributes)
