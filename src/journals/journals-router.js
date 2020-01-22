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

  journalsRouter
  .route('/:journal_id')
  .all((req, res, next) => {
      JournalsService.getById(
          req.app.get('db'),
          req.params.journal_id
      )
      .then(journal => {
          if (!journal) {
              return res.status(400).json({
                  error: {
                      message: `That journal doesn't exists`
                  }
              })
          }
          res.journal = journal
          next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
      res.json(JournalsService.serializeJournal(res.journal))
  })
  .delete((req, res, next) => {
      JournalsService.deleteJournal(
          req.app.get('db'),
          req.params.journal_id
      )
      .then(numOfRowsAffected => {
          res.status(204).end()  //no content 
      })
      .catch(next)
  })
  .patch(jsonBodyParser,(req, res, next) => {
      const { title } = req.body
      const updatedjournal = { title }

      const numOfValues = Object.values(updatedjournal).filter(Boolean).length

      if (numOfValues === 0) {
          res.status(400).json({
              error: {
                  message: `Request body must contain 'title'`
              }
          })
      }x

      JournalsService.updateJournal(
          req.app.get('db'),
          req.params.journal_id,
          updatedjournal
      )
      .then(numOfRowsAffected => {
          res.status(204).end()  // no content 
      })
      .catch(next)
  })


module.exports = journalsRouter