const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  verifyPassword(password) {
    if (password.length < 8) {
      return `Password must be at least 8 characters`
    }
    if (password.length > 72) {
      return `Password must be less than 73 characters`
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return `Password must not start or end with spaces`
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return `Password must contain 1 upper case, lower case, number and special character`
    }
    return null
  },
  hasUserWithUserName(db, user_name) {
    return db('thoughtful_users')
      .where({ user_name })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('thoughtful_users')
      .returning('*')
      .then(([user]) => user)
  },
  serializeUser(user) {
    return {
      id: xss(user.id),
      user_name: xss(user.user_name),
      full_name: xss(user.full_name),
      pseudonym: xss(user.pseudonym),
      date_created: new Date(user.date_created),
    }
  }
}

module.exports = UsersService