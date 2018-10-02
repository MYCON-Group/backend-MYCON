const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);
const dbConfig = require('../config');
const db = pgp(dbConfig);

module.exports = db;