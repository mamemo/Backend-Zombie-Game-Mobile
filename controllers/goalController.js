const db = require('../db');
const auth = require('./authController');

// add query functions
module.exports = {
  getAllGoals: getAllGoals,
  getSingleGoal: getSingleGoal,
  createGoal: createGoal,
  updateGoal: updateGoal,
  removeGoal: removeGoal,
  getGoalsXChallenge: getGoalsXChallenge
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
function getAllGoals(req, res, next) {
  if (validate(req, res)) {
    db.any('select * from goals')
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
function getSingleGoal(req, res, next) {
  if (validate(req, res)) {
    const GoalID = parseInt(req.params.id);
    db.one('select * from goals where id = $1', GoalID)
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

//Function to get goals of a challenge
function getGoalsXChallenge(req, res, next) {
  if (validate(req, res)) {
    const GoalID = parseInt(req.params.id);
    db.any('select * from goals where challenge_id = $1', GoalID)
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
function createGoal(req, res, next) {
  if (validate(req, res)) {
    req.body.latitud = parseFloat(req.body.latitud);
    req.body.longitud = parseFloat(req.body.longitud);
    req.body.points = parseFloat(req.body.points);
    req.body.type_id = parseInt(req.body.type_id);
    req.body.challenge_id = parseFloat(req.body.challenge_id);
    db.none('insert into goals(name, latitud, longitud, points, type_id, challenge_id)' +
        'values(${name}, ${latitud}, ${longitud}, ${points}, ${type_id}, ${challenge_id})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Goal'
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
function updateGoal(req, res, next) {
  if (validate(req, res)) {
    db.none('update goals set name=$1, latitud=$2, longitud=$3, points=$4,' +
        'type_id=$5, challenge_id=$6 where id=$7', [req.body.name, parseFloat(req.body.latitud), parseFloat(req.body.longitud),
          parseFloat(req.body.points), parseInt(req.body.type_id),
          parseInt(req.body.challenge_id), parseInt(req.params.id)
        ])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Goal'
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
function removeGoal(req, res, next) {
  if (validate(req, res)) {
    const GoalID = parseInt(req.params.id);
    db.result('delete from goals where id = $1', GoalID)
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Goals`
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
