
require('dotenv').load();


module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    DATABASE_URL:
    process.env.DATABASE_URL || 'mongodb://localhost/SEED_REST',
    TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/SEED_REST-test'
    // DATABASE_URL:
    //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
    // TEST_DATABASE_URL:
    //     process.env.TEST_DATABASE_URL ||
    //     'postgres://localhost/thinkful-backend-test'
};
exports.TEST_PORT = process.env.TEST_PORT || 8081;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';