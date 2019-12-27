const express = require('express')
const EntriesService = require('../entries/entries-service')
const { requireAuth } = require('../middleware/jwt-auth')

const entriesRouter = express.Router()

entriesRouter
  .route('/')
  .get((req, res, next) => {
    EntriesService.getAllEntries(req.app.get('db'))
      .then(entries => {
        res.json(entries.map(EntriesService.serializeEntry))
      })
      .catch(next)
  })

  entriesRouter
    .route('/:entry_id')
    .all(requireAuth)
    .get((req, res) => {
      res.json(EntriesService.serializeEntry(res.entry))
    })
  
module.exports = entriesRouter
  