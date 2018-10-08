const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);
const dbConfig = require('../config');

console.log(dbConfig)
console.log(process.env.POSTGRES_HOST)
console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)
console.log(process.env.NODE_ENV)
const db = process.env.NODE_ENV === 'docker' ? pgp({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}) : pgp(dbConfig);

module.exports = db;