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

const { resolve } = require('path')
const TJS = require('typescript-json-schema')
const { writeFileSync } = require('fs')
const { each, isEqual } = require('lodash')

const randomString = 'WK9fxjlOcM'

const types = [
  'ClientPushChangesRequest',
  'ClientPullChangesRequest',
  'SignInWithGoogleRequest',
  'MailAuthTokenRequestBody',
  'CreateFamilyByMailTokenRequest',
  'SignIntoFamilyRequest',
  'RecoverParentPasswordRequest',
  'CanRecoverPasswordRequest',
  'RegisterChildDeviceRequest',
  'SerializedParentAction',
  'SerializedAppLogicAction',
  'SerializedChildAction',
  'CreateRegisterDeviceTokenRequest',
  'CanDoPurchaseRequest',
  'FinishPurchaseByGooglePlayRequest',
  'LinkParentMailAddressRequest',
  'UpdatePrimaryDeviceRequest',
  'RemoveDeviceRequest',
  'RequestWithAuthToken',
  'SendMailLoginCodeRequest',
  'SignInByMailCodeRequest'
]

const settings = {
  required: true,
  noExtraProps: true
};

const compilerOptions = {
  strictNullChecks: true,
  lib: ['es2015']
}

// optionally pass a base path
const program = TJS.getProgramFromFiles([
  resolve(__dirname, '../src/api/schema.ts')
], compilerOptions, __dirname)

const generator = TJS.buildGenerator(program, settings)

let definitions = {}
let schemas = {}
let output = ''

types.forEach((type) => {
  const schema = generator.getSchemaForSymbol(type)

  schemas[type] = schema

  if (schema.definitions) {
    each(schema.definitions, (value, name) => {
      if (!definitions[name]) {
        definitions[name] = value
      } else {
        if (!isEqual(definitions[name], value)) {
          throw new Error('different schemas for ' + name)
        }
      }
    })
  }
})

output += '// tslint:disable \n'
output += 'import { ' + types.join(', ') + ' } from \'./schema\'\n'
output += 'const Ajv = require(\'ajv\')\n'
output += 'const ajv = new Ajv()\n'
output += '\n'
output += 'const definitions = ' + JSON.stringify(definitions, null, 2) + '\n\n'

types.forEach((type) => {
  const schema = schemas[type]
  let schemaString

  if (schema.definitions) {
    schemaString = JSON.stringify({
      ...schema,
      definitions: randomString
    }, null, 2).replace(JSON.stringify(randomString), 'definitions')
  } else {
    schemaString = JSON.stringify(schema, null, 2)
  }

  const functionBody = 'ajv.compile(' + schemaString + ')'
  const functionName = 'is' + type.substr(0, 1).toUpperCase() + type.substr(1)

  output += 'export const ' + functionName + ': (value: object) => value is ' + type + ' = ' + functionBody + '\n'
})

writeFileSync(resolve(__dirname, '../src/api/validator.ts'), output)
