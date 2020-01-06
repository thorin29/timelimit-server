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

import { assertIdWithinFamily } from '../util/token'
import { ParentAction } from './basetypes'

export class UpdateCategoryBatteryLimitAction extends ParentAction {
  readonly categoryId: string
  readonly chargeLimit?: number
  readonly mobileLimit?: number

  constructor ({ categoryId, chargeLimit, mobileLimit }: {
    categoryId: string
    chargeLimit?: number
    mobileLimit?: number
  }) {
    super()

    assertIdWithinFamily(categoryId)

    if (chargeLimit !== undefined) {
      if ((!Number.isSafeInteger(chargeLimit)) || chargeLimit < 0 || chargeLimit > 100) {
        throw new Error('charge limit out of range')
      }
    }

    if (mobileLimit !== undefined) {
      if ((!Number.isSafeInteger(mobileLimit)) || mobileLimit < 0 || mobileLimit > 100) {
        throw new Error('mobile limit out of range')
      }
    }

    this.categoryId = categoryId
    this.chargeLimit = chargeLimit
    this.mobileLimit = mobileLimit
  }

  serialize = (): SerializedUpdateCategoryBatteryLimitAction => ({
    type: 'UPDATE_CATEGORY_BATTERY_LIMIT',
    categoryId: this.categoryId,
    mobileLimit: this.mobileLimit,
    chargeLimit: this.chargeLimit
  })

  static parse = ({ categoryId, chargeLimit, mobileLimit }: SerializedUpdateCategoryBatteryLimitAction) => (
    new UpdateCategoryBatteryLimitAction({ categoryId, chargeLimit, mobileLimit })
  )
}

export interface SerializedUpdateCategoryBatteryLimitAction {
  type: 'UPDATE_CATEGORY_BATTERY_LIMIT'
  categoryId: string
  chargeLimit?: number
  mobileLimit?: number
}
