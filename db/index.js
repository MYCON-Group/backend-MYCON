const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);
const dbConfig = process.env.NODE_ENV === 'docker' ? ({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}) : require('../config');


const db = pgp(dbConfig);

module.exports = db;