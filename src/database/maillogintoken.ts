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

export interface MailLoginTokenAttributes {
  mailLoginToken: string
  receivedCode: string
  mail: string
  createdAt: string
  remainingAttempts: number
}

export type MailLoginTokenModel = Sequelize.Model & MailLoginTokenAttributes
export type MailLoginTokenModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): MailLoginTokenModel;
}

export const attributes: SequelizeAttributes<MailLoginTokenAttributes> = {
  mailLoginToken: {
    ...authTokenColumn,
    primaryKey: true
  },
  receivedCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  createdAt: { ...timestampColumn },
  remainingAttempts: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}

export const createMailLoginTokenModel = (sequelize: Sequelize.Sequelize): MailLoginTokenModelStatic => <MailLoginTokenModelStatic>sequelize.define('MailLoginToken', attributes)
