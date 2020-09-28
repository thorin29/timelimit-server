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

import * as TokenGenerator from 'tokgen'
import { ValidationException } from '../exception'

const authTokenGenerator = new TokenGenerator({
  length: 32,
  chars: 'a-zA-Z0-9'
})

export const generateAuthToken = () => authTokenGenerator.generate()

const idWithinFamilyGenerator = new TokenGenerator({
  length: 6,
  chars: 'a-zA-Z0-9'
})

export const generateIdWithinFamily = () => idWithinFamilyGenerator.generate()
export const isIdWithinFamily = (id: string) => id.length === 6 && /^[a-zA-Z0-9]+$/.test(id)
export const assertIdWithinFamily = (id: string) => {
  if (!isIdWithinFamily(id)) {
    throw new ValidationException({
      staticMessage: 'invalid id within family',
      dynamicMessage: 'invalid id within family: ' + id
    })
  }
}

const versionIdGenerator = new TokenGenerator({
  length: 4,
  chars: 'a-zA-Z0-9'
})

export const generateVersionId = () => versionIdGenerator.generate()

const familyIdGenerator = new TokenGenerator({
  length: 10,
  chars: 'a-zA-Z0-9'
})

export const generateFamilyId = () => familyIdGenerator.generate()

const purchaseIdGenerator = new TokenGenerator({
  length: 10,
  chars: 'a-zA-Z0-9'
})

export const generatePurchaseId = () => purchaseIdGenerator.generate()
