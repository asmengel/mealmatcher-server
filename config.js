require('dotenv').config();

module.exports = {
      JWT_SECRET: process.env.JWT_SECRET,
      PORT: process.env.PORT || 8080,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'mongodb://localhost/meal-matcher',
      DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/meal-matcher',
      TEST_DATABASE_URL: 
      process.env.TEST_DATABASE_URL ||
      'mongodb://localhost/meal-matcher-test',
      JWT_EXPIRY: process.env.JWT_EXPIRY,
};