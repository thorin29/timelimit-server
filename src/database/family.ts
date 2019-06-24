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
import { booleanColumn, familyIdColumn, optionalLabelColumn, timestampColumn, versionColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface FamilyAttributes {
  familyId: string
  name: string
  createdAt: string
  userListVersion: string
  deviceListVersion: string
  fullVersionUntil: string
  hasFullVersion: boolean
}

export type FamilyModel = Sequelize.Model & FamilyAttributes
export type FamilyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): FamilyModel;
}

export const attributes: SequelizeAttributes<FamilyAttributes> = {
  familyId: {
    ...familyIdColumn,
    primaryKey: true
  },
  name: { ...optionalLabelColumn },
  createdAt: { ...timestampColumn },
  userListVersion: { ...versionColumn },
  deviceListVersion: { ...versionColumn },
  fullVersionUntil: { ...timestampColumn },
  hasFullVersion: { ...booleanColumn }
}

export const createFamilyModel = (sequelize: Sequelize.Sequelize): FamilyModelStatic => <FamilyModelStatic>sequelize.define('Family', attributes)
