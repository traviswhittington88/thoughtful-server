const xss = require('xss')

const EntriesService = {
  getAllEntries(db) {
    return db
      .from('thoughtful_entries AS ent')
      .select('*')
  },
  getById(db, id) {
    return db
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
    return db
      .where({ id })
      .delete()
  },
  updateEntry(db, id, newEntryFields) {
    return db
      .where({ id })
      .update(newEntryFields)
  } 
}

module.exports = EntriesService