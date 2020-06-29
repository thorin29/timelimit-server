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

import * as Sequelize from 'sequelize'
import { familyIdColumn, idWithinFamilyColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface UserLimitLoginCategoryAttributes {
  familyId: string
  userId: string
  categoryId: string
}

export type UserLimitLoginCategoryModel = Sequelize.Model & UserLimitLoginCategoryAttributes
export type UserLimitLoginCategoryModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserLimitLoginCategoryModel;
}

export const attributes: SequelizeAttributes<UserLimitLoginCategoryAttributes> = {
  familyId: { ...familyIdColumn, primaryKey: true },
  userId: { ...idWithinFamilyColumn, primaryKey: true },
  categoryId: { ...idWithinFamilyColumn }
}

export const createUserLimitLoginCategoryModel = (sequelize: Sequelize.Sequelize): UserLimitLoginCategoryModelStatic => sequelize.define('UserLimitLoginCategory', attributes) as UserLimitLoginCategoryModelStatic
