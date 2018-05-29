const db = require('../db');
const bcrypt = require('bcryptjs');
const auth = require('./authController');

// add query functions
module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};

function validate(req, res) {
  if (!req.headers.hasOwnProperty('authorization') || req.headers.authorization == "" || !auth.autentificarAccion(req.headers.authorization)) {
    res.status(500)
      .json({
        status: 'error',
        type: 3 //Token malo
      });
    return false
  }
  return true
}

function getAllUsers(req, res, next) {
  //if (validate(req, res)) {
    db.any('select * from users')
      .then(function(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data
          });
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            err: err
          });
      });
  //}
}

function getSingleUser(req, res, next) {
  if (validate(req, res)) {
    const userMail = req.params.mail;
    db.one('select * from users where mail = $1', userMail)
      .then(function(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data
          });
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            err: err
          });
      });
  }
}

function createUser(req, res, next) {
  //if (validate(req, res)) {
    req.body.type_id = parseInt(req.body.type_id);
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    db.none('insert into users(name, mail, password, challenges_completed, points, zombies_killed, run_aways, type_id)' +
        'values(${name}, ${mail}, ${password}, 0, 0, 0, 0, ${type_id})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one user'
          });
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            err: err
          });
      });
  //}
}

function updateUser(req, res, next) {
  if (validate(req, res)) {
    db.none('update users set name=$1, password=$3, challenges_completed=$4, points=$5, zombies_killed=$6, run_aways=$7, type_id=$8 where mail=$2', [req.body.name, req.params.mail, bcrypt.hashSync(req.body.password), parseInt(req.body.challenges_completed), parseInt(req.body.points), parseInt(req.body.zombies_killed),
        parseInt(req.body.run_aways), parseInt(req.body.type_id)
      ])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated user'
          });
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            err: err
          });
      });
  }
}

function removeUser(req, res, next) {
  if (validate(req, res)) {
    const userMail = req.params.mail;
    db.result('delete from users where mail = $1', userMail)
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} users`
          });
        /* jshint ignore:end */
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            err: err
          });
      });
  }
}
