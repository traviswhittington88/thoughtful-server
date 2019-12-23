const express = require('express')

const journalsRouter = express.Router()
const jsonBodyParser = express.json()

journalsRouter
  .route('/')
  .get((req, res, next) => {
    res.send('getAllJournals')
  })

module.exports = journalsRouter