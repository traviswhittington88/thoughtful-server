const express = require('express')
const JournalsService = require('./journals-service')
const { requireAuth } = require('../middleware/jwt-auth')

const journalsRouter = express.Router()
const jsonBodyParser = express.json()

journalsRouter
  .route('/')
  .get((req, res, next) => {
    JournalsService.getAllJournals(req.app.get('db'))
      .then(journals => { 
        res.json(journals.map(JournalsService.serializeJournal))
      })
      .catch(next)
  })

module.exports = journalsRouter