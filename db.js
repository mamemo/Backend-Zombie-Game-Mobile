const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:admin123@zombies.crehatb3pukn.us-east-2.rds.amazonaws.com:5432/zombies';
const db = pgp(connectionString);

module.exports = db;
