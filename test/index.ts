import assert from 'assert'
import { describe, it } from 'node:test'

import { withTestDatabase, withTestDatabaseUrl } from './helper/database.js'

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
})
