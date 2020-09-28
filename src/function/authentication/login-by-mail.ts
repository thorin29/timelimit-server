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

import { Forbidden, Gone, TooManyRequests } from 'http-errors'
import { Database } from '../../database'
import { sendAuthenticationMail } from '../../util/mail'
import { areWordSequencesEqual, randomWords } from '../../util/random-words'
import { checkMailSendLimit } from '../../util/ratelimit-authmail'
import { generateAuthToken } from '../../util/token'
import { createAuthTokenByMailAddress } from './index'

export const sendLoginCode = async ({ mail, locale, database }: {
  mail: string
  locale: string
  database: Database
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ mailLoginToken: string }> => {
  try {
    await checkMailSendLimit(mail)
  } catch (ex) {
    throw new TooManyRequests()
  }

  const mailLoginToken = generateAuthToken()
  const code = randomWords(3)

  await sendAuthenticationMail({
    receiver: mail,
    code,
    locale
  })

  await database.transaction(async (transaction) => {
    await database.mailLoginToken.create({
      mailLoginToken,
      receivedCode: code,
      mail,
      createdAt: Date.now().toString(10),
      remainingAttempts: 3
    }, { transaction })
  })

  return {
    mailLoginToken
  }
}

// 403 Forbidden = receivedCode is invalid
// 410 Gone = mailLoginToken is invalid or expired
export const signInByMailCode = async ({ mailLoginToken, receivedCode, database }: {
  mailLoginToken: string
  receivedCode: string
  database: Database
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ mailAuthToken: string }> => {
  return database.transaction(async (transaction) => {
    const entry = await database.mailLoginToken.findOne({
      where: {
        mailLoginToken
      },
      transaction
    })

    if ((!entry) || entry.remainingAttempts === 0) {
      throw new Gone()
    }

    if (!areWordSequencesEqual(entry.receivedCode, receivedCode)) {
      entry.remainingAttempts--

      await entry.save({ transaction })

      if (entry.remainingAttempts === 0) {
        throw new Gone()
      } else {
        throw new Forbidden()
      }
    }

    const mailAuthToken = await createAuthTokenByMailAddress({ mail: entry.mail, database, transaction })

    return { mailAuthToken }
  })
}
