const xss = require('xss')

const JournalsService = {
  getAllJournals(db) {
    return db
      .from('thoughtful_journals')
      .select('*')
  },
  getById(db, id) {
    return db
      .from('thoughtful_journals')
      .where({ id })
      .first()
  },
  insertJournal(db, newJournal) {
    return db
      .insert(newJournal)
      .into('thoughtful_journals')
      .returning('*')
      .then(rows => {
             return rows[0]
      })
  },
  deleteJournal(db, id) {
    return db('thoughtful_journals')
      .where({ id })
      .delete()
  },
  updateJournal(db, id, newJournalFields) {
    return db('thoughtful_journals')
      .where({ id })
      .update(newJournalFields)
  },
  serializeJournal(journal) {
    return {
      id: journal.id,
      name: xss(journal.name),
      date_created: new Date(journal.date_created),
    }
  }
}

module.exports = JournalsService