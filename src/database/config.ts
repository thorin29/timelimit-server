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
import { SequelizeAttributes } from './types'

export interface ConfigAttributes {
  id: string
  value: string | null
}

export type ConfigInstance = Sequelize.Instance<ConfigAttributes> & ConfigAttributes
export type ConfigModel = Sequelize.Model<ConfigInstance, ConfigAttributes>

export const attributes: SequelizeAttributes<ConfigAttributes> = {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    primaryKey: true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
}

export const createConfigModel = (sequelize: Sequelize.Sequelize): ConfigModel => sequelize.define<ConfigInstance, ConfigAttributes>('Config', attributes)

export const configItemIds = {
  statusMessage: 'status_message'
}
