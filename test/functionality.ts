import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, testPassword1, SimpleDatabase } from './helper/database.js'
import { signInIntoFamily } from '../src/function/parent/sign-in-into-family.js'
import { createFamily } from '../src/function/parent/create-family.js'
import { InMemoryEventHandler } from '../src/monitoring/inmemoryeventhandler.js'
import { generateIdWithinFamily } from '../src/util/token.js'
import { createMailTransport } from '../src/util/mail.js'
import { dummyWebsocketApi } from '../src/websocket/index.js'

describe('functionality', () => {
  describe('create family', () => {
    const mail1 = 'user1@a.timelmit.io'

    async function createFamilyEasy(database: SimpleDatabase, mailAuthToken: string) {
      return await createFamily({
        config: { alwaysPro: false },
        database,
        eventHandler: new InMemoryEventHandler(),
        mailAuthToken,
        firstParentDevice: { model: 'Mega Phone' },
        password: testPassword1,
        timeZone: 'Europe/Berlin',
        parentName: 'P1',
        deviceName: 'D1',
        clientLevel: 1
      })
    }

    async function happyPath(database: SimpleDatabase) {
      const mailAuthToken = await database.transaction(async (transaction) => {
        return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
      })

      return await createFamilyEasy(database, mailAuthToken)
    }

    it('should consume the mail auth token', async () => {
      withTestDatabase(async (database) => {
        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
        })

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndKeep(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, true)
        })

        await createFamilyEasy(database, mailAuthToken)

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndKeep(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, false)
        })
      })
    })

    it('should create the family with matching device id and auth token', async () => {
      withTestDatabase(async (database) => {
        const result = await happyPath(database)

        await database.transaction(async (transaction) => {
          const deviceInfo = await transaction.device.getFamilyIdAndDeviceIdByAuthToken(result.deviceAuthToken)

          assert.strictEqual(deviceInfo !== null, true)
          assert.strictEqual(deviceInfo?.deviceId, result.deviceId)
        })
      })
    })

    it('should create the family with premium', async () => {
      withTestDatabase(async (database) => {
        const result = await happyPath(database)

        await database.transaction(async (transaction) => {
          const familyId = await transaction.device.getFamilyIdByAuthToken(result.deviceAuthToken)

          if (familyId === null) throw new Error()

          const hasPremium = await transaction.family.hasFullVersionByFamilyId(familyId)

          assert.strictEqual(hasPremium, true)
        })
      })
    })

    it('should detect already assigned mail addresses', async () => {
      withTestDatabase(async (database) => {
        await happyPath(database)

        await assert.rejects(
          happyPath(database),
          HttpErrors.Conflict
        )
      })
    })

    it('should reject used auth tokens', async () => {
      withTestDatabase(async (database) => {
        const mailAuthToken = await database.transaction(async (transaction) => {
          return await transaction.authToken.create({ time: 1, mail: mail1, locale: 'de' })
        })

        await database.transaction(async (transaction) => {
          const tokenInfo = await transaction.authToken.checkAndDestroy(mailAuthToken)

          assert.strictEqual(tokenInfo !== null, true)
        })

        await assert.rejects(
          createFamilyEasy(database, mailAuthToken),
          HttpErrors.Unauthorized
        )
      })
    })
  })

  describe('sign in into family', () => {
    const mail1 = 'test@a.timelimit.io'
    const mail2 = 'test@b.timelimit.io'
    const mail3 = 'test@c.timelimit.io'
    const deviceName = 'ND'
    const newDeviceInfo = {
      model: 'Super Phone'
    }
    const timeZone = 'Europe/Berlin'
    const locale = 'en'
    const clientLevel = 0
    const websocket = dummyWebsocketApi
    const eventHandler = new InMemoryEventHandler()
    const config = { alwaysPro: false }
    const mailTransport = createMailTransport({ mailTransport: { type: 'test' } })

    it('should work', async function() {
      await withTestDatabase(async (database) => {
        const { familyId, userId, mailAuthToken } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family2 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family3 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })

          const userId = generateIdWithinFamily()

          await transaction.user.create({
            familyId: family1.familyId,
            userId,
            name: 'P1',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail1,
            timeZone,
          })

          await transaction.user.create({
            familyId: family2.familyId,
            userId,
            name: 'P2',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail2,
            timeZone,
          })

          await transaction.user.create({
            familyId: family3.familyId,
            userId,
            name: 'P3',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail3,
            timeZone,
          })

          const mailAuthToken = await transaction.authToken.create({
            time: 1,
            mail: mail2,
            locale,
          })

          return { familyId: family2.familyId, userId, mailAuthToken }
        })

        const result = await signInIntoFamily({
          config,
          database,
          eventHandler,
          mailAuthToken,
          newDeviceInfo,
          deviceName,
          websocket,
          clientLevel,
          mailTransport,
        })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.device.getFamilyIdAndDeviceIdByAuthToken(result.deviceAuthToken)
          const reply2 = await transaction.device.getFamilyIdAndCurrentUserByAuthToken(result.deviceAuthToken)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply1?.deviceId, result.deviceId)
          assert.strictEqual(reply1?.familyId, familyId)

          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply2?.currentUserId, userId)
          assert.strictEqual(reply2?.familyId, familyId)
        })
      })
    })

    it('should fail for unknown mail addresses', async function() {
      await withTestDatabase(async (database) => {
        const { mailAuthToken } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })
          const family2 = await transaction.family.create({ time: 1, fullVersionUntil: 2 })

          const userId = generateIdWithinFamily()

          await transaction.user.create({
            familyId: family1.familyId,
            userId,
            name: 'P1',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail1,
            timeZone,
          })

          await transaction.user.create({
            familyId: family2.familyId,
            userId,
            name: 'P2',
            passwordHash: testPassword1.hash,
            secondPasswordHash: testPassword1.secondHash,
            secondPasswordSalt: testPassword1.secondSalt,
            type: 'parent',
            mail: mail2,
            timeZone,
          })

          const mailAuthToken = await transaction.authToken.create({
            time: 1,
            mail: mail3,
            locale,
          })

          return { mailAuthToken }
        })

        await assert.rejects(
          signInIntoFamily({
            config,
            database,
            eventHandler,
            mailAuthToken,
            newDeviceInfo,
            deviceName,
            websocket,
            clientLevel,
            mailTransport,
          }),
          HttpErrors.Conflict
        )
      })
    })
  })
})
