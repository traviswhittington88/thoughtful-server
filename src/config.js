module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://thoughtful_admin@localhost/thoughtful',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}