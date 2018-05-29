const db = require('../db');

// add query functions
module.exports = {
  getAllChallengesGoalsUser: getAllChallengesGoalsUser,
  getSingleChallengesGoalsUser: getSingleChallengesGoalsUser,
  createChallengesGoalsUser: createChallengesGoalsUser,
  updateChallengesGoalsUser: updateChallengesGoalsUser,
  removeChallengesGoalsUser: removeChallengesGoalsUser
};

function getAllChallengesGoalsUser(req, res, next) {
  db.any('select * from challenges_and_goals_x_user')
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

function getSingleChallengesGoalsUser(req, res, next) {
  const ID = parseInt(req.params.id);
  db.one('select * from challenges_and_goals_x_user where user_id = $1', ID)
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

function createChallengesGoalsUser(req, res, next) {
  req.body.user_id = parseInt(req.body.user_id);
  req.body.challenge_id = parseInt(req.body.challenge_id);
  req.body.goal_id = parseInt(req.body.goal_id);
  db.none('insert into challenges_and_goals_x_user(user_id, challenge_id, goal_id)' +
      'values(${user_id},${challenge_id}, ${goal_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one ChallengeGoal per User'
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

function updateChallengesGoalsUser(req, res, next) {
  db.none('update challenges_and_goals_x_user set goal_id=$1 where challenge_id=$2 and user_id=$3',
    [parseInt(req.body.goal_id), parseInt(req.body.challenge_id), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated ChallengeGoal per User'
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

function removeChallengesGoalsUser(req, res, next) {
  db.result('delete from challenges_and_goals_x_user where goal_id=$1 and challenge_id=$2 and user_id=$3', 
  [parseInt(req.body.goal_id), parseInt(req.body.challenge_id), parseInt(req.params.id)])
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} ChallengeGoal per User`
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
