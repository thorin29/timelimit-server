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
import { serializedBitmaskRegex } from '../util/bitmask'
import { booleanColumn, familyIdColumn, idWithinFamilyColumn, labelColumn, optionalIdWithinFamilyColumn, versionColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface CategoryAttributesVersion1 {
  familyId: string
  categoryId: string
  childId: string
  title: string
  blockedMinutesInWeek: string
  extraTimeInMillis: number
  temporarilyBlocked: boolean
  baseVersion: string
  assignedAppsVersion: string
  timeLimitRulesVersion: string
  usedTimesVersion: string
}

export interface CategoryAttributesVersion2 {
  parentCategoryId: string
}

export interface CategoryAttributesVersion3 {
  blockAllNotifications: boolean
}

export interface CategoryAttributesVersion4 {
  timeWarningFlags: number
}

export type CategoryAttributes = CategoryAttributesVersion1 & CategoryAttributesVersion2 &
  CategoryAttributesVersion3 & CategoryAttributesVersion4

export type CategoryInstance = Sequelize.Instance<CategoryAttributes> & CategoryAttributes
export type CategoryModel = Sequelize.Model<CategoryInstance, CategoryAttributes>

export const attributesVersion1: SequelizeAttributes<CategoryAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  categoryId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  childId: { ...idWithinFamilyColumn },
  title: { ...labelColumn },
  blockedMinutesInWeek: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      is: serializedBitmaskRegex
    }
  },
  extraTimeInMillis: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  temporarilyBlocked: { ...booleanColumn },
  baseVersion: { ...versionColumn },
  assignedAppsVersion: { ...versionColumn },
  timeLimitRulesVersion: { ...versionColumn },
  usedTimesVersion: { ...versionColumn }
}

export const attributesVersion2: SequelizeAttributes<CategoryAttributesVersion2> = {
  parentCategoryId: {
    ...optionalIdWithinFamilyColumn,
    defaultValue: ''
  }
}

export const attributesVersion3: SequelizeAttributes<CategoryAttributesVersion3> = {
  blockAllNotifications: {
    ...booleanColumn,
    defaultValue: false
  }
}

export const attributesVersion4: SequelizeAttributes<CategoryAttributesVersion4> = {
  timeWarningFlags: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 1 | 2 | 4 | 8 | 16
      // 1 => 1 minute
      // 2 => 3 minutes
      // 4 => 5 minutes
      // 8 => 10 minutes
      // 16 => 15 minutes
    }
  }
}

export const attributes: SequelizeAttributes<CategoryAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3,
  ...attributesVersion4
}

export const createCategoryModel = (sequelize: Sequelize.Sequelize): CategoryModel => sequelize.define<CategoryInstance, CategoryAttributes>('Category', attributes)
