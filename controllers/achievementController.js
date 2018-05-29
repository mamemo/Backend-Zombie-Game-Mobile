const db = require('../db');

// add query functions
module.exports = {
  getAllAchievements: getAllAchievements,
  getSingleAchievement: getSingleAchievement,
  createAchievement: createAchievement,
  updateAchievement: updateAchievement,
  removeAchievement: removeAchievement
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


function getAllAchievements(req, res, next) {
  if (validate(req, res)) {
    db.any('select * from achievements')
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

function getSingleAchievement(req, res, next) {
  if (validate(req, res)) {
    const achievementID = parseInt(req.params.id);
    db.one('select * from achievements where id = $1', achievementID)
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

function createAchievement(req, res, next) {
  if (validate(req, res)) {
    db.none('insert into achievements(name, description)' +
        'values(${name},${description})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Achievement'
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

function updateAchievement(req, res, next) {
  if (validate(req, res)) {
    db.none('update achievements set name=$1, description=$2 where id=$3', [req.body.name, req.body.description, parseInt(req.params.id)])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Achievement'
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

function removeAchievement(req, res, next) {
  if (validate(req, res)) {
    const AchievementID = parseInt(req.params.id);
    db.result('delete from achievements where id = $1', AchievementID)
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Achievements`
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
