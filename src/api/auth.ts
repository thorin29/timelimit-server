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

import { json } from 'body-parser'
import { Router } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { BadRequest } from 'http-errors'
import { Database } from '../database'
import { createAuthTokenByMailAddress } from '../function/authentication'
import { sendLoginCode, signInByMailCode } from '../function/authentication/login-by-mail'
import {
  isSendMailLoginCodeRequest,
  isSignInByMailCodeRequest,
  isSignInWithGoogleRequest
} from './validator'

const CLIENT_ID = process.env.GOOGLE_SIGN_IN_CLIENT_ID || ''
const client = new OAuth2Client(CLIENT_ID)

const getMailByGoogleAuthToken = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID
  })

  if (!ticket) {
    throw new BadRequest()
  }

  const payload = ticket.getPayload()

  if (!payload) {
    throw new BadRequest()
  }

  if (!payload.email_verified) {
    throw new BadRequest()
  }

  const mail = payload.email

  if (!mail) {
    throw new BadRequest()
  }

  if (!(
    mail.endsWith('@gmail.com') ||
    mail.endsWith('@googlemail.com')
  )) {
    throw new BadRequest()
  }

  return mail
}

export const createAuthRouter = (database: Database) => {
  const router = Router()

  router.post('/sign-in-with-google', json(), async (req, res, next) => {
    try {
      if (!isSignInWithGoogleRequest(req.body)) {
        res.sendStatus(400)
        return
      }

      const { googleAuthToken } = req.body

      const mail = await getMailByGoogleAuthToken(googleAuthToken)
      const mailAuthToken = await createAuthTokenByMailAddress({ mail, database })

      res.json({
        mailAuthToken
      })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/send-mail-login-code', json(), async (req, res, next) => {
    try {
      if (!isSendMailLoginCodeRequest(req.body)) {
        throw new BadRequest()
      }

      const { mailLoginToken } = await sendLoginCode({
        mail: req.body.mail,
        locale: req.body.locale,
        database
      })

      res.json({ mailLoginToken })
    } catch (ex) {
      next(ex)
    }
  })

  router.post('/sign-in-by-mail-code', json(), async (req, res, next) => {
    try {
      if (!isSignInByMailCodeRequest(req.body)) {
        throw new BadRequest()
      }

      const { mailAuthToken } = await signInByMailCode({
        receivedCode: req.body.receivedCode,
        mailLoginToken: req.body.mailLoginToken,
        database
      })

      res.json({ mailAuthToken })
    } catch (ex) {
      next(ex)
    }
  })

  return router
}
