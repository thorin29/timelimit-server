import assert from 'assert'
import { describe, it } from 'node:test'

import { withTestDatabase, withTestTransaction, withTestDatabaseUrl } from './helper/database.js'

describe('base', () => {
  it('should run tests', () => {
    // nothing to do
  })
})

describe('database', () => {
  it('should be possible to start a temporary database', async () => {
    await withTestDatabaseUrl(async (databaseUrl) => {
      // nothing to do with the database url
    })
  })

  it('should be possible to run the migrations', async () => {
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
