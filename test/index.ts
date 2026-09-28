import assert from 'assert'
import { describe, it } from 'node:test'

import { withTestDatabase, withTestTransaction, withTestDatabaseUrl } from './helper/database.js'
import { dummyWebsocketApi } from '../src/websocket/index.js'
import { runWorkersOnce } from '../src/worker/index.js'

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
  })
})
