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
    return db
      .where({ id })
      .delete()
  },
  updateJournal(db, id, newJournalFields) {
    return db
      .where({ id })
      .update(newJournalFields)
  },
  serializeJournal(journal) {
    return {
      id: journal.id,
      title: xss(journal.title),
      date_created: new Date(entry.date_created),
    }
  }
}

module.exports = JournalsService