require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "ammo_teste",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "ammo_teste",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "host":  process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}