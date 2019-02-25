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
import { AddDeviceTokenModel, createAddDeviceTokenModel } from './adddevicetoken'
import { AppModel, createAppModel } from './app'
import { AuthTokenModel, createAuthtokenModel } from './authtoken'
import { CategoryModel, createCategoryModel } from './category'
import { CategoryAppModel, createCategoryAppModel } from './categoryapp'
import { createDeviceModel, DeviceModel } from './device'
import { createFamilyModel, FamilyModel } from './family'
import { createMailLoginTokenModel, MailLoginTokenModel } from './maillogintoken'
import { createUmzug } from './migration/umzug'
import { createOldDeviceModel, OldDeviceModel } from './olddevice'
import { createPurchaseModel, PurchaseModel } from './purchase'
import { createTimelimitRuleModel, TimelimitRuleModel } from './timelimitrule'
import { createUsedTimeModel, UsedTimeModel } from './usedtime'
import { createUserModel, UserModel } from './user'

export interface Database {
  addDeviceToken: AddDeviceTokenModel
  authtoken: AuthTokenModel
  app: AppModel
  category: CategoryModel
  categoryApp: CategoryAppModel
  device: DeviceModel
  family: FamilyModel
  mailLoginToken: MailLoginTokenModel
  oldDevice: OldDeviceModel
  purchase: PurchaseModel
  timelimitRule: TimelimitRuleModel
  usedTime: UsedTimeModel
  user: UserModel
  transaction: <T> (autoCallback: (t: Sequelize.Transaction) => Promise<T>) => Promise<T>
}

const createDatabase = (sequelize: Sequelize.Sequelize): Database => ({
  addDeviceToken: createAddDeviceTokenModel(sequelize),
  authtoken: createAuthtokenModel(sequelize),
  app: createAppModel(sequelize),
  category: createCategoryModel(sequelize),
  categoryApp: createCategoryAppModel(sequelize),
  device: createDeviceModel(sequelize),
  family: createFamilyModel(sequelize),
  mailLoginToken: createMailLoginTokenModel(sequelize),
  oldDevice: createOldDeviceModel(sequelize),
  purchase: createPurchaseModel(sequelize),
  timelimitRule: createTimelimitRuleModel(sequelize),
  usedTime: createUsedTimeModel(sequelize),
  user: createUserModel(sequelize),
  transaction: <T> (autoCallback: (transaction: Sequelize.Transaction) => Promise<T>) => (sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
  }, autoCallback) as any) as Promise<T>
})

export const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite://test.db', {
  define: {
    timestamps: false
  },
  operatorsAliases: false,
  logging: false
})

export const defaultDatabase = createDatabase(sequelize)
export const defaultUmzug = createUmzug(sequelize)
