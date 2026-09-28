import assert from 'assert'
import { describe, it } from 'node:test'

import HttpErrors from 'http-errors'

import { withTestDatabase, withTestTransaction, withTestDatabaseUrl, SimpleDatabase } from './helper/database.js'
import { Config } from '../src/config.js'
import { signInIntoFamily } from '../src/function/parent/sign-in-into-family.js'
import { createFamily } from '../src/function/parent/create-family.js'
import { InMemoryEventHandler } from '../src/monitoring/inmemoryeventhandler.js'
import { generateIdWithinFamily, generateAuthToken } from '../src/util/token.js'
import { createMailTransport } from '../src/util/mail.js'
import { dummyWebsocketApi } from '../src/websocket/index.js'
import { runWorkersOnce } from '../src/worker/index.js'

const testConfig: Config = {
  databaseUrl: 'invalid',
  mailWhitelist: [],
  disableSignup: false,
  pingInterval: 25 * 1000,
  alwaysPro: false,
  signSecret: '',
  mailTransport: { type: 'test' },
}

const testPassword1 = {
  // actually "password"
  hash: '$2a$12$LdgIZsnhZherEUmvwTyYhOeiILfklleonBDCmnbxB3dnVxeeaYG3C',
  secondHash: '$2a$12$jKUQG/pG87J5pbqRE4NytOQN4U5R.6km2bjxviLzbuis/ZT8JVBO6',
  secondSalt: '$2a$12$jKUQG/pG87J5pbqRE4NytO',
}

describe('base', () => {
  it('should run tests', () => {
    // nothing to do
  })
})

describe('database', () => {
  it('should be possible to start a temporary database', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await withTestDatabaseUrl(async (databaseUrl) => {
      // nothing to do with the database url
    })
  })

  it('should be possible to run the migrations', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await withTestDatabase(async (database) => {
      // helper function already runs the migrations
    })
  })

  it('should be possible to run a test query', async () => {
    await withTestDatabase(async (database) => {
      await database.transaction(async (transaction) => {
        assert.strictEqual(
          await transaction.device.getFamilyIdByAuthToken('not found'),
          null
        )
      })
    })
  })

  describe('family table', () => {
    it('should be possible to create two distinct items', async () => {
      await withTestTransaction(async (transaction) => {
        const family1 = await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        const family2 = await transaction.family.create({ time: 30, fullVersionUntil: 40 })

        assert.notEqual(family1.familyId, family2.familyId)
      })
    })

    it('should be possible to get correct full version until data', async () => {
      await withTestTransaction(async (transaction) => {
        await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        const family2 = await transaction.family.create({ time: 30, fullVersionUntil: 40 })
        await transaction.family.create({ time: 50, fullVersionUntil: 60 })

        const reply = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)

        assert.deepStrictEqual({
          fullVersionUntil: 40,
          fullVersionDebts: 0,
        }, reply)
      })
    })

    it('should be not possible to get full version until data for deleted families', async () => {
      await withTestTransaction(async (transaction) => {
        await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        const family2 = await transaction.family.create({ time: 30, fullVersionUntil: 40 })
        await transaction.family.create({ time: 50, fullVersionUntil: 60 })

        await transaction.family.destroyByFamilyIds([ family2.familyId ])

        const reply = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)

        assert.strictEqual(reply, null)
      })
    })

    it('should be possible to get the correct list of families with expired full version', async () => {
      await withTestTransaction(async (transaction) => {
        const family1 = await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        const family2 = await transaction.family.create({ time: 30, fullVersionUntil: 40 })
        const family3 = await transaction.family.create({ time: 50, fullVersionUntil: 60 })

        const reply1 = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(0)
        const reply2 = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(20)
        const reply3 = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(21)
        const reply4 = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(41)
        const reply5 = await transaction.family.getFamilyIdsWithFullVersionUntilLowerThan(99)

        function compareSets(actual: Array<string>, expected: Array<string>) {
          actual.sort(); expected.sort()

          assert.deepStrictEqual(actual, expected)
        }

        compareSets(reply1, [])
        compareSets(reply2, [])
        compareSets(reply3, [ family1.familyId ])
        compareSets(reply4, [ family1.familyId, family2.familyId ])
        compareSets(reply5, [ family1.familyId, family2.familyId, family3.familyId ])
      })
    })

    it('should be possible to check for the full version of new families after removing another family', async () => {
      await withTestTransaction(async (transaction) => {
        const family1 = await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        const family2 = await transaction.family.create({ time: 30, fullVersionUntil: 40 })
        await transaction.family.create({ time: 50, fullVersionUntil: 60 })

        await transaction.family.destroyByFamilyIds([ family1.familyId ])

        const reply2 = await transaction.family.hasFullVersionByFamilyId(family2.familyId)

        assert.strictEqual(reply2, true)
      })
    })

    it('should be possible to check for the full version of deleted families', async () => {
      await withTestTransaction(async (transaction) => {
        const family1 = await transaction.family.create({ time: 10, fullVersionUntil: 20 })
        await transaction.family.create({ time: 30, fullVersionUntil: 40 })
        await transaction.family.create({ time: 50, fullVersionUntil: 60 })

        await transaction.family.destroyByFamilyIds([ family1.familyId ])

        const reply1 = await transaction.family.hasFullVersionByFamilyId(family1.familyId)

        assert.strictEqual(reply1, false)
      })
    })
  })
})

describe('functionality', () => {
  describe('create family', () => {
    const mail1 = 'user1@a.timelmit.io'

    async function createFamilyEasy(database: SimpleDatabase, mailAuthToken: string) {
      return await createFamily({
        config: testConfig,
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
    const config = testConfig
    const mailTransport = createMailTransport(testConfig)

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

describe('background worker', () => {
  describe('delete old families', () => {
    const month = 1000 * 60 * 60 * 24 * 31
    const websocket = dummyWebsocketApi

    it('should not delete families before premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 9 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should not delete families shortly after premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 11 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, true)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should delete one family after its premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 15 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true)
          assert.strictEqual(reply2 !== null, false)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should delete two family after their premium expires', async () => {
      await withTestDatabase(async (database) => {
        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          return { family1, family2, family3 }
        })

        await runWorkersOnce({ database, websocket, time: month * 25 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, false)
          assert.strictEqual(reply2 !== null, false)
          assert.strictEqual(reply3 !== null, true)
        })
      })
    })

    it('should only delete the family after their premium expires if no device was seen recently', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1, family2, family3 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })
          const family2 = await transaction.family.create({ time: 10, fullVersionUntil: month * 10 })
          const family3 = await transaction.family.create({ time: 10, fullVersionUntil: month * 30 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family2.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1, family2, family3 }
        })

        // should keep both
        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 49,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 51, // slightly in the future
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 50 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, true, '1.1')
          assert.strictEqual(reply2 !== null, true, '1.2')
          assert.strictEqual(reply3 !== null, false, '1.3')
        })

        // should delete the older one
        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 55,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 60,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 61 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)
          const reply2 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family2.familyId)
          const reply3 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family3.familyId)

          assert.strictEqual(reply1 !== null, false, '2.1')
          assert.strictEqual(reply2 !== null, true, '2.2')
          assert.strictEqual(reply3 !== null, false, '2.3')
        })
      })
    })

    it('should consider the newest device per family', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1 }
        })

        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 50,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 90,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 90 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)

          assert.strictEqual(reply1 !== null, true)
        })
      })
    })

    it('should keep families with premium and old devices', async () => {
      await withTestDatabase(async (database) => {
        const deviceAuthToken1 = generateAuthToken()
        const deviceAuthToken2 = generateAuthToken()

        const { family1 } = await database.transaction(async (transaction) => {
          const family1 = await transaction.family.create({ time: 10, fullVersionUntil: month * 20 })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken1,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D1',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          await transaction.device.create({
            familyId: family1.familyId,
            time: 0,
            userId: '',
            deviceAuthToken: deviceAuthToken2,
            deviceId: generateIdWithinFamily(),
            deviceName: 'D2',
            deviceModel: 'SUPER',
            isUserKeptSignedIn: false,
          })

          return { family1 }
        })

        await database.transaction(async (transaction) => {
          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken1,
            lastConnectivity: month * 1,
          })

          await transaction.device.updateLastConnectivityByDeviceAuthToken({
            deviceAuthToken: deviceAuthToken2,
            lastConnectivity: month * 2,
          })
        })

        await runWorkersOnce({ database, websocket, time: month * 18 })

        await database.transaction(async (transaction) => {
          const reply1 = await transaction.family.getFullVersionUntilAndDebtsByFamilyId(family1.familyId)

          assert.strictEqual(reply1 !== null, true)
        })
      })
    })
  })
})
