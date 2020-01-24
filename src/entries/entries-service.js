const xss = require('xss')

const EntriesService = {
  getAllEntries(db) {
    return db
      .from('thoughtful_entries')
      .select('*')
  },
  getEntriesByJournalId(db, journal_id) {
    return db
      .from('thoughtful_entries')
      .select('*')
      .where({ journal_id })
  },
  getById(db, id) {
    return db
      .select('*')
      .from('thoughtful_entries')
      .where({ id })
      .first()
  },
  insertEntry(db, newEntry) {
    return db
      .insert(newEntry)
      .into('thoughtful_entries')
      .returning('*')
      .then(rows => {
             return rows[0]
      })
  },
  deleteEntry(db, id) {
    return db('thoughtful_entries')
      .where({ id })
      .delete()
  },
  updateEntry(db, id, newEntryFields) {
    return db('thoughtful_entries')
      .where({ id })
      .update(newEntryFields)
  },
  serializeEntry(entry) {
    return {
      id: entry.id,
      title: xss(entry.title),
      content: xss(entry.content),
      pseudonym: xss(entry.pseudonym),
      journal_id: entry.journal_id,
      date_created: new Date(entry.date_created),
    }
  }
}

module.exports = EntriesService