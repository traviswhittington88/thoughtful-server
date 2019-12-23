const express = require('express')
const AuthService = require('./auth-service')
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

    AuthService.getUserByUserName(
      req.get.app('db'),
      loginUser.user_name
    )
    .then(dbUser => {
      if (!dbUser) {
        return res.status(400).json({
          error: `Incorrect user_name or password`
        })
      }
      return AuthService.comparePasswords(loginUser.password, dbUser.password)
        .then(passwordsMatch => {
          if (!passwordsMatch) 
            return res.status(400).json({
              error: `Incorrect user_name or password'`
            })
          res.send('ok')
        })
    })
    .catch(next)
  })

module.exports = authRouter