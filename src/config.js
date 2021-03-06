module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://thoughtful@localhost/thoughtful',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postresql://thoughtful@localhost/thoughtful-test',
    JWT_SECRET: process.env.JWT_SECRET || 'thoughtful-client-auth-token',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1hr',
}