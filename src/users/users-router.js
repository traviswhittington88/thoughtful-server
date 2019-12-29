const express = require('express')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { user_name, full_name, password } = req.body
    const newUser = { user_name, full_name, password }

    for (const field of ['user_name', 'full_name', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field} in response body`, 
        })
      }
    }
  })

  module.exports = usersRouter