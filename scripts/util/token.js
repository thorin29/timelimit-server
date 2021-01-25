/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2021 Jonas Lochmann
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

const TokenGenerator = require('tokgen')

const tokenGenerator = new TokenGenerator({
  length: 32,
  chars: 'a-zA-Z0-9'
})

const shortTokenGenerator = new TokenGenerator({
  length: 8,
  chars: 'a-zA-Z0-9'
})

function generateToken() { return tokenGenerator.generate() }
function generateShortToken() { return shortTokenGenerator.generate() }

module.exports = { generateToken, generateShortToken }
