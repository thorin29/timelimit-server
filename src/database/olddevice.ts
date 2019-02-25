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
import { authTokenColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface OldDeviceAttributes {
  deviceAuthToken: string
}

export type OldDeviceInstance = Sequelize.Instance<OldDeviceAttributes> & OldDeviceAttributes
export type OldDeviceModel = Sequelize.Model<OldDeviceInstance, OldDeviceAttributes>

export const attributes: SequelizeAttributes<OldDeviceAttributes> = {
  deviceAuthToken: {
    ...authTokenColumn,
    primaryKey: true
  }
}

export const createOldDeviceModel = (sequelize: Sequelize.Sequelize): OldDeviceModel => sequelize.define<OldDeviceInstance, OldDeviceAttributes>('OldDevice', attributes)
