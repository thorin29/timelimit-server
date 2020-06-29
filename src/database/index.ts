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
import { AddDeviceTokenModelStatic, createAddDeviceTokenModel } from './adddevicetoken'
import { AppModelStatic, createAppModel } from './app'
import { AppActivityModelStatic, createAppActivityModel } from './appactivity'
import { AuthTokenModelStatic, createAuthtokenModel } from './authtoken'
import { CategoryModelStatic, createCategoryModel } from './category'
import { CategoryAppModelStatic, createCategoryAppModel } from './categoryapp'
import { ConfigModelStatic, createConfigModel } from './config'
import { createDeviceModel, DeviceModelStatic } from './device'
import { createFamilyModel, FamilyModelStatic } from './family'
import { createMailLoginTokenModel, MailLoginTokenModelStatic } from './maillogintoken'
import { createUmzug } from './migration/umzug'
import { createOldDeviceModel, OldDeviceModelStatic } from './olddevice'
import { createPurchaseModel, PurchaseModelStatic } from './purchase'
import { createSessionDurationModel, SessionDurationModelStatic } from './sessionduration'
import { createTimelimitRuleModel, TimelimitRuleModelStatic } from './timelimitrule'
import { createUsedTimeModel, UsedTimeModelStatic } from './usedtime'
import { createUserModel, UserModelStatic } from './user'
import { createUserLimitLoginCategoryModel, UserLimitLoginCategoryModelStatic } from './userlimitlogincategory'

export interface Database {
  addDeviceToken: AddDeviceTokenModelStatic
  authtoken: AuthTokenModelStatic
  app: AppModelStatic
  appActivity: AppActivityModelStatic
  category: CategoryModelStatic
  categoryApp: CategoryAppModelStatic
  config: ConfigModelStatic
  device: DeviceModelStatic
  family: FamilyModelStatic
  mailLoginToken: MailLoginTokenModelStatic
  oldDevice: OldDeviceModelStatic
  purchase: PurchaseModelStatic
  sessionDuration: SessionDurationModelStatic
  timelimitRule: TimelimitRuleModelStatic
  usedTime: UsedTimeModelStatic
  user: UserModelStatic
  userLimitLoginCategory: UserLimitLoginCategoryModelStatic
  transaction: <T> (autoCallback: (t: Sequelize.Transaction) => Promise<T>) => Promise<T>
}

const createDatabase = (sequelize: Sequelize.Sequelize): Database => ({
  addDeviceToken: createAddDeviceTokenModel(sequelize),
  authtoken: createAuthtokenModel(sequelize),
  app: createAppModel(sequelize),
  appActivity: createAppActivityModel(sequelize),
  category: createCategoryModel(sequelize),
  categoryApp: createCategoryAppModel(sequelize),
  config: createConfigModel(sequelize),
  device: createDeviceModel(sequelize),
  family: createFamilyModel(sequelize),
  mailLoginToken: createMailLoginTokenModel(sequelize),
  oldDevice: createOldDeviceModel(sequelize),
  purchase: createPurchaseModel(sequelize),
  sessionDuration: createSessionDurationModel(sequelize),
  timelimitRule: createTimelimitRuleModel(sequelize),
  usedTime: createUsedTimeModel(sequelize),
  user: createUserModel(sequelize),
  userLimitLoginCategory: createUserLimitLoginCategoryModel(sequelize),
  transaction: <T> (autoCallback: (transaction: Sequelize.Transaction) => Promise<T>) => (sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
  }, autoCallback) as any) as Promise<T>
})

export const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL || 'sqlite://test.db', {
  define: {
    timestamps: false
  },
  logging: false
})

export const defaultDatabase = createDatabase(sequelize)
export const defaultUmzug = createUmzug(sequelize)
