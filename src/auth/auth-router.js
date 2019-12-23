const express = require('express')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }

    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }
    res.send('ok')
  })

module.exports = authRouter