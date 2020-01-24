const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      pseudonym: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      pseudonym: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      pseudonym: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      pseudonym: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeEntriesArray(journals) {
  return [
    {
      id: 1,
      title: 'First test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      pseudonym: 'Bugs Bunny',
      journal_id: journals[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      title: 'Second test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      pseudonym: 'Elmer Fudd',
      journal_id: journals[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z')
      
    },
    {
      id: 3,
      title: 'Third test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      pseudonym: 'Taz',
      journal_id: journals[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 4,
      title: 'Fourth test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      pseudonym: 'Beep Beep',
      journal_id: journals[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
  ]
}

function makeJournalsArray() {
  return [
    {
      id: 1,
      name: 'journal one',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      name: 'journal two',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      name: 'journal three',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      name: 'journal four',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      name: 'journal five',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeThoughtsFixtures() {
  const testJournals = makeJournalsArray()
  const testUsers = makeUsersArray()
  const testEntries = makeEntriesArray(testJournals)
  return { testUsers, testEntries, testJournals }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        thoughtful_entries,
        thoughtful_users,
        thoughtful_journals
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE thoughtful_entries_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thoughtful_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thoughtful_journals_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('thoughtful_entries_id_seq', 0)`),
        trx.raw(`SELECT setval('thoughtful_users_id_seq', 0)`),
        trx.raw(`SELECT setval('thoughtful_journals_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('thoughtful_users').insert(preppedUsers)
    .then(() => 
      //update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('thoughtful_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedEntriesTables(db, users, journals=[], entries) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    if (journals.length) {
      await trx.into('thoughtful_journals').insert(journals)
      await trx.raw(
        `SELECT setval('thoughtful_journals_id_seq', ?)`,
        [journals[journals.length - 1].id],
      )
    }
    await trx.into('thoughtful_entries').insert(entries)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('thoughtful_entries_id_seq', ?)`,
      [entries[entries.length - 1].id],
    )
    // only insert journals if there are some, also update the sequence counter
 
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })

  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeEntriesArray,
  makeJournalsArray,
  makeThoughtsFixtures,
  cleanTables,
  seedEntriesTables,
  seedUsers,
  makeAuthHeader,
}