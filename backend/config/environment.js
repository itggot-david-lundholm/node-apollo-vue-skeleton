const dotenv = require('dotenv/config')

module.exports = {
  development: {
    username: 'development_database',
    password: 'development_database',
    database: 'development_database',
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    dialect: "postgres"
  },

}
