const db = require('../db');
const auth = require('./authController');

// add query functions
module.exports = {
  getAllAchivementsUser: getAllAchivementsUser,
  getSingleAchivementsUser: getSingleAchivementsUser,
  createAchivementsUser: createAchivementsUser,
  updateAchivementsUser: updateAchivementsUser,
  removeAchivementsUser: removeAchivementsUser
};

//Function to validate a request
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

//Function to get all rows in table
function getAllAchivementsUser(req, res, next) {
  if (validate(req, res)) {
    db.any('select * from achievements_x_user')
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

//Function to get single row in table
function getSingleAchivementsUser(req, res, next) {
  if (validate(req, res)) {
    const mail = req.params.mail;
    db.one('select * from achievements_x_user where user_mail = $1', mail)
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

//Function to insert a new row
function createAchivementsUser(req, res, next) {
  if (validate(req, res)) {
    req.body.achievement_id = parseInt(req.body.achievement_id);
    db.none('insert into achievements_x_user(user_mail, achievement_id)' +
        'values(${mail},${achievement_id})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Achivement per User'
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

//Function to update a row in table
function updateAchivementsUser(req, res, next) {
  if (validate(req, res)) {
    db.none('update achievements_x_user set achievement_id=$1 where user_mail=$2', [parseInt(req.body.achievement_id), req.params.mail])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Achievement per User'
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

//Function to remove a row in table
function removeAchivementsUser(req, res, next) {
  if (validate(req, res)) {
    db.result('delete from achievements_x_user where achievement_id=$1 and user_mail=$2', [parseInt(req.body.achievement_id), req.params.mail])
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Achievement per User`
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
