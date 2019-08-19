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
import { optionalPasswordRegex, optionalSaltRegex } from '../util/password'
import { booleanColumn, createEnumColumn, familyIdColumn, idWithinFamilyColumn, labelColumn, optionalIdWithinFamilyColumn, timestampColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface UserAttributesVersion1 {
  familyId: string
  userId: string
  name: string
  passwordHash: string
  secondPasswordHash: string
  secondPasswordSalt: string
  type: 'parent' | 'child'
  mail: string
  timeZone: string
  disableTimelimitsUntil: string
  // empty = unset; can contain an invalid device id or the id of an device which is not used by this user
  // in this case, it should be treated like unset
  currentDevice: string
}

export interface UserAttributesVersion2 {
  categoryForNotAssignedApps: string
}

export interface UserAttributesVersion3 {
  relaxPrimaryDeviceRule: boolean
}

export interface UserAttributesVersion4 {
  // 1: manipulation warnings
  mailNotificationFlags: number
}

export interface UserAttributesVersion5 {
  blockedTimes: string
}

export type UserAttributes = UserAttributesVersion1 & UserAttributesVersion2 &
  UserAttributesVersion3 & UserAttributesVersion4 & UserAttributesVersion5

export type UserModel = Sequelize.Model & UserAttributes
export type UserModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserModel;
}

export const attributesVersion1: SequelizeAttributes<UserAttributesVersion1> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  userId: {
    ...idWithinFamilyColumn,
    primaryKey: true
  },
  name: { ...labelColumn },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: optionalPasswordRegex
    }
  },
  secondPasswordHash: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: optionalPasswordRegex
    }
  },
  secondPasswordSalt: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: optionalSaltRegex
    }
  },
  type: createEnumColumn(['parent', 'child']),
  mail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeZone: { ...labelColumn },
  disableTimelimitsUntil: { ...timestampColumn },
  currentDevice: { ...optionalIdWithinFamilyColumn }
}

export const attributesVersion2: SequelizeAttributes<UserAttributesVersion2> = {
  categoryForNotAssignedApps: {
    ...optionalIdWithinFamilyColumn,
    defaultValue: ''
  }
}

export const attributesVersion3: SequelizeAttributes<UserAttributesVersion3> = {
  relaxPrimaryDeviceRule: {
    ...booleanColumn,
    defaultValue: false
  }
}

export const attributesVersion4: SequelizeAttributes<UserAttributesVersion4> = {
  mailNotificationFlags: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1
    }
  }
}

export const attributesVersion5: SequelizeAttributes<UserAttributesVersion5> = {
  blockedTimes: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
    validate: {
      is: serializedBitmaskRegex
    }
  }
}

export const attributes: SequelizeAttributes<UserAttributes> = {
  ...attributesVersion1,
  ...attributesVersion2,
  ...attributesVersion3,
  ...attributesVersion4,
  ...attributesVersion5
}

export const createUserModel = (sequelize: Sequelize.Sequelize): UserModelStatic => sequelize.define('User', attributes) as UserModelStatic
