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
import { generateIdWithinFamily } from '../util/token'
import { AddDeviceTokenModelStatic, createAddDeviceTokenModel } from './adddevicetoken'
import { AppModelStatic, createAppModel } from './app'
import { AppActivityModelStatic, createAppActivityModel } from './appactivity'
import { AuthTokenModelStatic, createAuthtokenModel } from './authtoken'
import { CategoryModelStatic, createCategoryModel } from './category'
import { CategoryAppModelStatic, createCategoryAppModel } from './categoryapp'
import { CategoryNetworkIdModelStatic, createCategoryNetworkIdModel } from './categorynetworkid'
import { ChildTaskModelStatic, createChildTaskModel } from './childtask'
import { configItemIds, ConfigModelStatic, createConfigModel } from './config'
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

export type Transaction = Sequelize.Transaction

export interface Database {
  addDeviceToken: AddDeviceTokenModelStatic
  authtoken: AuthTokenModelStatic
  app: AppModelStatic
  appActivity: AppActivityModelStatic
  category: CategoryModelStatic
  categoryApp: CategoryAppModelStatic
  categoryNetworkId: CategoryNetworkIdModelStatic
  childTask: ChildTaskModelStatic
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
  transaction: <T> (autoCallback: (transaction: Transaction) => Promise<T>, options?: { transaction: Transaction }) => (sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    transaction: options?.transaction
  }, autoCallback) as any) as Promise<T>,
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

class NestedTransactionTestException extends Error {}
class TestRollbackException extends NestedTransactionTestException {}
class NestedTransactionsNotWorkingException extends NestedTransactionTestException { constructor () { super('NestedTransactionsNotWorkingException') } }
class IllegalStateException extends NestedTransactionTestException {}

export async function assertNestedTransactionsAreWorking (database: Database) {
  const testValue = generateIdWithinFamily()

  // clean up just for the case
  await database.config.destroy({ where: { id: configItemIds.selfTestData } })

  await database.transaction(async (transaction) => {
    const readOne = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

    if (readOne) throw new IllegalStateException()

    await database.transaction(async (transaction) => {
      await database.config.create({ id: configItemIds.selfTestData, value: testValue }, { transaction })

      const readTwo = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

      if (readTwo?.value !== testValue) throw new IllegalStateException()

      try {
        await database.transaction(async (transaction) => {
          await database.config.destroy({ where: { id: configItemIds.selfTestData }, transaction })

          throw new TestRollbackException()
        }, { transaction })
      } catch (ex) {
        if (!(ex instanceof TestRollbackException)) throw ex
      }

      const readThree = await database.config.findOne({ where: { id: configItemIds.selfTestData }, transaction })

      if (readThree?.value !== testValue) throw new NestedTransactionsNotWorkingException()

      await database.config.destroy({ where: { id: configItemIds.selfTestData }, transaction })
    }, { transaction })
  })
}
