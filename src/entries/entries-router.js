const path = require('path')
const express = require('express')
const EntriesService = require('../entries/entries-service')
const { requireAuth } = require('../middleware/jwt-auth')

const entriesRouter = express.Router()
const jsonBodyParser = express.json()

entriesRouter
  .route('/')
  .get((req, res, next) => {
    EntriesService.getAllEntries(req.app.get('db'))
      .then(entries => {
        res.json(entries.map(EntriesService.serializeEntry))
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, content, pseudonym, journal_id } = req.body
    const newEntry = { title, content, journal_id } 

    for (const [key, value] of Object.entries(newEntry)) {
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    }

    newEntry.pseudonym = pseudonym

    EntriesService.insertEntry(
      req.app.get('db'),
      newEntry
    )
    .then(entry => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${entry.id}`))
        .json(EntriesService.serializeEntry(entry))
    })
    .catch(next)
  })

  entriesRouter
    .route('/:entry_id')
    .all(requireAuth)
    .get((req, res, next) => {
      EntriesService.getById(
        req.app.get('db'),
        req.params.entry_id
      )
      .then(entry => {
        if (!entry) {
          res.status(400).json({
            error: {
              message: `Entry does not exist`
            }
          })
        }
        res.entry = entry
        next()
      })
      .catch(next)
    })
    .get((req, res, next) => {
      res.json(EntriesService.serializeEntry(res.entry))
    })
    .delete((req, res, next) => {
      EntriesService.getById(
        req.app.get('db'),
        req.params.entry_id
      )
      .then(entry => {
        if (entry.user_id.toString() !== req.get('user_id').toString()) {
          res.status(400).json({ 
            error: {
              message: `Sorry that entry does not belong to you!`
            }
          })
        } else {
          res.status(204).send('Entry deleted')
        }
        next()
      })
      .catch(next)

      /*EntriesService.deleteEntry(
        req.app.get('db'),
        req.params.entry_id
      )
      .then(numOfRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next) => {
      const { title, content, pseudonym } = req.body
      const updatedEntry = { title, content, pseudonym }
      const numOfValues = Object.values(updatedEntry).filter(Boolean).length
      if (numOfValues === 0) {
          res.status(400).json({
              error: {
                  message: `Request body must be one of 'name', 'modified' or 'content'`
              }
          })
      }
      EntriesService.updateEntry(
          req.app.get('db'),
          req.params.entry_id,
          updatedEntry
      )
      .then(numOfRowsAffected => {
          res.status(204).end()
      })
      .catch(next) */
  })

entriesRouter
    .route('/journal/:journal_id')
    .all(requireAuth)
    .get((req, res, next) => {
      EntriesService.getEntriesByJournalId(
        req.app.get('db'),
        req.params.journal_id
      )
      .then(entries => {
        res.json(entries.map(EntriesService.serializeEntry))
      })
      .catch(next)
  })
  
module.exports = entriesRouter
  