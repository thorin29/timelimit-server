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

import { SerializedTimeLimitRule, TimelimitRule } from '../model/timelimitrule'
import { ParentAction } from './basetypes'

export class CreateTimeLimitRuleAction extends ParentAction {
  rule: TimelimitRule

  constructor ({ rule }: {rule: TimelimitRule}) {
    super()

    this.rule = rule
  }

  static parse = ({ rule }: SerializedCreateTimelimtRuleAction) => (
    new CreateTimeLimitRuleAction({
      rule: TimelimitRule.parse(rule)
    })
  )
}

export interface SerializedCreateTimelimtRuleAction {
  type: 'CREATE_TIMELIMIT_RULE'
  rule: SerializedTimeLimitRule
}
