const express = require('express')
const path = require('path')
const UsersService = require('../users/users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { user_name, full_name, pseudonym, password } = req.body
    const newUser = { user_name, full_name, pseudonym, password }

    console.log(newUser)

    for (const field of ['user_name', 'full_name', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field} in response body`, 
        })
      }
      
    
    const passwordError = UsersService.verifyPassword(password)

    if (passwordError) {
      return res.status(400).json({
        error: passwordError
      })
    }

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName) {
          return res.status(400).json({
            error: `Username already taken`
          })
        }
          return UsersService.hashPassword(password)
            .then(hashedPassword => {
              const newUser = {
                user_name,
                password: hashedPassword,
                full_name,
                pseudonym,
                date_created: 'now()',
              }
              return UsersService.insertUser(
                req.app.get('db'),
                newUser
              )
                .then(user => {
                  res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                    .json(UsersService.serializeUser(user))
                })
            })
      
      })
      .catch(next)
    }
  })

  module.exports = usersRouter