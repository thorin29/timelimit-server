/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2022 Jonas Lochmann
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
import { CategoryNetworkIdModelStatic, createCategoryNetworkIdModel } from './categorynetworkid'
import { CategoryTimeWarningModelStatic, createCategoryTimeWarningModel } from './categorytimewarning'
import { ChildTaskModelStatic, createChildTaskModel } from './childtask'
import { ConfigModelStatic, createConfigModel } from './config'
import { createDeviceModel, DeviceModelStatic } from './device'
import { createDeviceDhKey, DeviceDhKeyModelStatic } from './devicedhkey'
import { createEncryptedAppListModel, EncryptedAppListModelStatic } from './encryptedapplist'
import { createFamilyModel, FamilyModelStatic } from './family'
import { createKeyRequestModel, KeyRequestModelStatic } from './keyrequest'
import { createKeyResponseModel, KeyResponseModelStatic } from './keyresponse'
import { createMailLoginTokenModel, MailLoginTokenModelStatic } from './maillogintoken'
import { createUmzug } from './migration/umzug'
import { createOldDeviceModel, OldDeviceModelStatic } from './olddevice'
import { createPurchaseModel, PurchaseModelStatic } from './purchase'
import { createSessionDurationModel, SessionDurationModelStatic } from './sessionduration'
import { createTimelimitRuleModel, TimelimitRuleModelStatic } from './timelimitrule'
import { createUsedTimeModel, UsedTimeModelStatic } from './usedtime'
import { createUserModel, UserModelStatic } from './user'
import { createUserLimitLoginCategoryModel, UserLimitLoginCategoryModelStatic } from './userlimitlogincategory'

export type Transaction = Sequelize.Transaction

export interface Database {
  addDeviceToken: AddDeviceTokenModelStatic
  authtoken: AuthTokenModelStatic
  app: AppModelStatic
  appActivity: AppActivityModelStatic
  category: CategoryModelStatic
  categoryApp: CategoryAppModelStatic
  categoryNetworkId: CategoryNetworkIdModelStatic
  categoryTimeWarning: CategoryTimeWarningModelStatic
  childTask: ChildTaskModelStatic
  config: ConfigModelStatic
  device: DeviceModelStatic
  deviceDhKey: DeviceDhKeyModelStatic
  encryptedAppList: EncryptedAppListModelStatic
  family: FamilyModelStatic
  keyRequest: KeyRequestModelStatic
  keyResponse: KeyResponseModelStatic
  mailLoginToken: MailLoginTokenModelStatic
  oldDevice: OldDeviceModelStatic
  purchase: PurchaseModelStatic
  sessionDuration: SessionDurationModelStatic
  timelimitRule: TimelimitRuleModelStatic
  usedTime: UsedTimeModelStatic
  user: UserModelStatic
  userLimitLoginCategory: UserLimitLoginCategoryModelStatic
  transaction: <T> (autoCallback: (t: Transaction) => Promise<T>, options?: { transaction: Transaction }) => Promise<T>
  dialect: string
}

const createDatabase = (sequelize: Sequelize.Sequelize): Database => ({
  addDeviceToken: createAddDeviceTokenModel(sequelize),
  authtoken: createAuthtokenModel(sequelize),
  app: createAppModel(sequelize),
  appActivity: createAppActivityModel(sequelize),
  category: createCategoryModel(sequelize),
  categoryApp: createCategoryAppModel(sequelize),
  childTask: createChildTaskModel(sequelize),
  categoryNetworkId: createCategoryNetworkIdModel(sequelize),
  categoryTimeWarning: createCategoryTimeWarningModel(sequelize),
  config: createConfigModel(sequelize),
  device: createDeviceModel(sequelize),
  deviceDhKey: createDeviceDhKey(sequelize),
  encryptedAppList: createEncryptedAppListModel(sequelize),
  family: createFamilyModel(sequelize),
  keyRequest: createKeyRequestModel(sequelize),
  keyResponse: createKeyResponseModel(sequelize),
  mailLoginToken: createMailLoginTokenModel(sequelize),
  oldDevice: createOldDeviceModel(sequelize),
  purchase: createPurchaseModel(sequelize),
  sessionDuration: createSessionDurationModel(sequelize),
  timelimitRule: createTimelimitRuleModel(sequelize),
  usedTime: createUsedTimeModel(sequelize),
  user: createUserModel(sequelize),
  userLimitLoginCategory: createUserLimitLoginCategoryModel(sequelize),
  transaction: <T> (autoCallback: (transaction: Transaction) => Promise<T>, options?: { transaction: Transaction }) => (sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    transaction: options?.transaction
  }, autoCallback)) as Promise<T>,
  dialect: sequelize.getDialect()
})

export const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL || 'sqlite://test.db', {
  define: {
    timestamps: false
  },
  logging: false
})

export const defaultDatabase = createDatabase(sequelize)
export const defaultUmzug = createUmzug(sequelize)
