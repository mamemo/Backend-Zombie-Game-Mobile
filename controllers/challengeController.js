const db = require('../db');

// add query functions
module.exports = {
  getAllChallenges: getAllChallenges,
  getSingleChallenge: getSingleChallenge,
  createChallenge: createChallenge,
  updateChallenge: updateChallenge,
  removeChallenge: removeChallenge
};

function getAllChallenges(req, res, next) {
  db.any('select * from challenges')
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

function getSingleChallenge(req, res, next) {
  const challengeID = parseInt(req.params.id);
  db.one('select * from challenges where id = $1', challengeID)
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

function createChallenge(req, res, next) {
  req.body.latitud_inicial = parseFloat(req.body.latitud_inicial);
  req.body.longitud_inicial = parseFloat(req.body.longitud_inicial);
  req.body.latitud_final = parseFloat(req.body.latitud_final);
  req.body.longitud_final = parseFloat(req.body.longitud_final);
  req.body.zombies_probability = parseFloat(req.body.zombies_probability);
  db.none('insert into challenges(name, description, latitud_inicial, longitud_inicial, ' +
    'latitud_final, longitud_final, zombies_probability)' +
      'values(${name}, ${description}, ${latitud_inicial}, ${longitud_inicial}, ' +
        '${latitud_final}, ${longitud_final}, ${zombies_probability})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one challenge'
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

function updateChallenge(req, res, next) {
  db.none('update challenges set name=$1, description=$2, latitud_inicial=$3, longitud_inicial=$4,'+
  'latitud_final=$5, longitud_final=$6, zombies_probability=$7 where id=$8',
    [req.body.name, req.body.description, parseFloat(req.body.latitud_inicial), parseFloat(req.body.longitud_inicial),
      parseFloat(req.body.latitud_final), parseFloat(req.body.longitud_final),
      parseFloat(req.body.zombies_probability), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated challenge'
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

function removeChallenge(req, res, next) {
  const challengeID = parseInt(req.params.id);
  db.result('delete from challenges where id = $1', challengeID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} challenges`
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
