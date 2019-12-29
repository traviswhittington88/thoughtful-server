const knex = requrie('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Users endpoints', function() {
  let db
  const { testUsers } = helper.makeEntriesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe('POST /api/users', () => {
    context('User validation', () => {
      beforeEach('insert users', () => {
        helpers.seedUsers(
          db,
          testUsers
        )
      })

      const requiredFields = ['user_name', 'full_name', 'password']

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          user_name: 'test user_name',
          full_name: 'test full_name',
          pseudonym: 'test pseudonym',
          password: 'test password',
        }

        it(`responds with 400 required error when ${field} is missing`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing ${field} in request body`,
            })
        })
      })

    })
  })
})