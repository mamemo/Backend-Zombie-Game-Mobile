const db = require('../db');
const auth = require('./authController');

// add query functions
module.exports = {
  getAllChallengesGoalsUser: getAllChallengesGoalsUser,
  getSingleChallengesGoalsUser: getSingleChallengesGoalsUser,
  createChallengesGoalsUser: createChallengesGoalsUser,
  updateChallengesGoalsUser: updateChallengesGoalsUser,
  removeChallengesGoalsUser: removeChallengesGoalsUser
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
function getAllChallengesGoalsUser(req, res, next) {
  if (validate(req, res)) {
    db.any('select * from challenges_and_goals_x_user')
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
function getSingleChallengesGoalsUser(req, res, next) {
  if (validate(req, res)) {
    const mail = req.params.mail;
    db.one('select * from challenges_and_goals_x_user where user_mail = $1', mail)
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
function createChallengesGoalsUser(req, res, next) {
  if (validate(req, res)) {
    req.body.challenge_id = parseInt(req.body.challenge_id);
    req.body.goal_id = parseInt(req.body.goal_id);
    db.none('insert into challenges_and_goals_x_user(user_mail, challenge_id, goal_id)' +
        'values(${mail},${challenge_id}, ${goal_id})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one ChallengeGoal per User'
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
function updateChallengesGoalsUser(req, res, next) {
  if (validate(req, res)) {
    db.none('update challenges_and_goals_x_user set goal_id=$1 where challenge_id=$2 and user_mail=$3', [parseInt(req.body.goal_id), parseInt(req.body.challenge_id), req.params.mail])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated ChallengeGoal per User'
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
function removeChallengesGoalsUser(req, res, next) {
  if (validate(req, res)) {
    db.result('delete from challenges_and_goals_x_user where goal_id=$1 and challenge_id=$2 and user_mail=$3', [parseInt(req.body.goal_id), parseInt(req.body.challenge_id), req.params.mail])
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} ChallengeGoal per User`
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
