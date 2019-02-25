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
import { authTokenColumn, timestampColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface AuthTokenAttributes {
  token: string
  mail: string
  createdAt: string
}

export type AuthTokenInstance = Sequelize.Instance<AuthTokenAttributes> & AuthTokenAttributes
export type AuthTokenModel = Sequelize.Model<AuthTokenInstance, AuthTokenAttributes>

export const attributes: SequelizeAttributes<AuthTokenAttributes> = {
  token: {
    ...authTokenColumn,
    primaryKey: true
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  createdAt: { ...timestampColumn }
}

export const createAuthtokenModel = (sequelize: Sequelize.Sequelize): AuthTokenModel => sequelize.define<AuthTokenInstance, AuthTokenAttributes>('AuthToken', attributes)
