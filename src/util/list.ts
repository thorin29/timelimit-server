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

import { uniq } from 'lodash'

export function assertNonEmptyListWithoutDuplicates (list: Array<string>) {
  if (list.length === 0) {
    throw new Error('expected not empty list')
  }

  if (uniq(list).length !== list.length) {
    throw new Error('expected list without duplicates')
  }
}

export function assertListWithoutDuplicates (list: Array<string>) {
  if (uniq(list).length !== list.length) {
    throw new Error('expected list without duplicates')
  }
}
