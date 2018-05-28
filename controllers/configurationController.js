const db = require('../db');

// add query functions
module.exports = {
  getAllConfigurations: getAllConfigurations,
  getSingleConfiguration: getSingleConfiguration,
  createConfiguration: createConfiguration,
  updateConfiguration: updateConfiguration,
  removeConfiguration: removeConfiguration
};

function getAllConfigurations(req, res, next) {
  db.any('select * from Configuration')
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

function getSingleConfiguration(req, res, next) {
  const ConfigurationID = parseInt(req.params.id);
  db.one('select * from Configuration where id = $1', ConfigurationID)
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

function createConfiguration(req, res, next) {
  req.body.user_id = parseInt(req.body.user_id);
  db.none('insert into Configuration(volume, vibration, user_id)' +
      'values(true, true, ${user_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Configuration'
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

function updateConfiguration(req, res, next) {
  db.none('update Configuration set volume=$1, vibration=$2 where user_id=$3',
    [(req.body.volume == 'true'), (req.body.vibration == 'true'), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Configuration'
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

function removeConfiguration(req, res, next) {
  const ConfigurationID = parseInt(req.params.id);
  db.result('delete from Configuration where user_id = $1', ConfigurationID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Configurations`
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
