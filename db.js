const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:admin@localhost:5432/zombies';
const db = pgp(connectionString);

module.exports = db;
