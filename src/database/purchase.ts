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
import { createEnumColumn, familyIdColumn, timestampColumn } from './columns'
import { SequelizeAttributes } from './types'

export interface PurchaseAttributes {
  familyId: string
  service: 'googleplay'
  transactionId: string
  type: 'month' | 'year'
  loggedAt: string
  previousFullVersionEndTime: string
  newFullVersionEndTime: string
}

export type PurchaseInstance = Sequelize.Instance<PurchaseAttributes> & PurchaseAttributes
export type PurchaseModel = Sequelize.Model<PurchaseInstance, PurchaseAttributes>

export const attributes: SequelizeAttributes<PurchaseAttributes> = {
  familyId: { ...familyIdColumn },
  service: {
    ...createEnumColumn(['googleplay']),
    primaryKey: true
  },
  transactionId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  type: createEnumColumn(['month', 'year']),
  loggedAt: timestampColumn,
  previousFullVersionEndTime: timestampColumn,
  newFullVersionEndTime: timestampColumn
}

export const createPurchaseModel = (sequelize: Sequelize.Sequelize): PurchaseModel => sequelize.define<PurchaseInstance, PurchaseAttributes>('Purchase', attributes)
