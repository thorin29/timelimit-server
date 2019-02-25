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

import { split } from 'lodash'

export const serializedBitmaskRegex = /^(\d*,\d*(,\d*,\d*)*)?$/

export const validateBitmask = (bitmask: string, maxLength: number) => {
  if (!serializedBitmaskRegex.test(bitmask)) {
    throw new Error('bitmask does not match regex')
  }

  if (bitmask === '') {
    return
  }

  const splitpoints = split(bitmask, ',').map((item) => parseInt(item, 10))

  if (splitpoints.findIndex((item) => !Number.isSafeInteger(item)) !== -1) {
    throw new Error('bitmask contains non-safe integers')
  }

  if (splitpoints.findIndex((item) => item < 0) !== -1) {
    throw new Error('bitmask contains negative integers')
  }

  if (splitpoints.findIndex((item) => item > maxLength) !== -1) {
    throw new Error('bitmask contains integers bigger than maxSize')
  }

  let previousValue = -1

  splitpoints.forEach((item) => {
    if (item <= previousValue) {
      throw new Error('bitmask numbers are not strictly sorted')
    }

    previousValue = item
  })
}
