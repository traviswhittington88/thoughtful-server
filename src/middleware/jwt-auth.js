const bcrypt = require('bcryptjs')
const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {
  return res.status(401).json({ 
    error: `Missing bearer token`
  })
}

module.exports = {
  requireAuth,
}