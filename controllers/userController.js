var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/zombies';
var db = pgp(connectionString);

// add query functions
module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          err: err
        });
    });
}

function getSingleUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select * from users where id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          err: err
        });
    });
}

function createUser(req, res, next) {
  req.body.type_id = parseInt(req.body.type_id);
  db.none('insert into users(name, mail, password, challenges_completed, points, zombies_killed, run_aways, type_id)' +
      'values(${name}, ${mail}, ${password}, 0, 0, 0, 0, ${type_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          err: err
        });
    });
}

function updateUser(req, res, next) {
  db.none('update users set name=$1, mail=$2, password=$3, challenges_completed=$4, points=$5, zombies_killed=$6, run_aways=$7, type_id=$8 where id=$9',
    [req.body.name, req.body.mail, req.body.password, parseInt(req.body.challenges_completed), parseInt(req.body.points), parseInt(req.body.zombies_killed),
      parseInt(req.body.run_aways), parseInt(req.body.type_id), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          err: err
        });
    });
}

function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.result('delete from users where id = $1', userID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} users`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          err: err
        });
    });
}
