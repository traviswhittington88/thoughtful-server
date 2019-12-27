const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')

const journalsRouter = express.Router()
const jsonBodyParser = express.json()

journalsRouter
  .route('/')
  .get((req, res, next) => {
    res.send('getAllJournals')
  })

module.exports = journalsRouter