const express = require('express')
const EntriesService = require('../entries/entries-service')

const entriesRouter = express.Router()

entriesRouter
  .route('/')
  .get((req, res, next) => {
    EntriesService.getAllEntries(req.app.get('db'))
      .then(entries => {
        res.json()
      })
  })