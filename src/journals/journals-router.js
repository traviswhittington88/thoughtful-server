const express = require('express')
const path = require('path')
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
  .post(jsonBodyParser, (req, res, next) => {
    const { title } = req.body
    const newJournal = { title }

    for (const[key, value] of Object.entries(newJournal)) {
        if(value == null) {
            res.status(400).json({
                error: {
                    message: `Missing '${key}' in request body`
                }
            })
        }
    }

    JournalsService.insertJournal(
      req.app.get('db'),
      newJournal
  )
  .then(journal => {
      return res.status(201)  //created
                  .location(path.posix.join(req.originalUrl, `/${journal.id}`))
                  .json(JournalsService.serializeJournal(journal))
  })
  .catch(next)
})

module.exports = journalsRouter