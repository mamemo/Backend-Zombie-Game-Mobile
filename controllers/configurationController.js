const db = require('../db');

// add query functions
module.exports = {
  getAllConfigurations: getAllConfigurations,
  getSingleConfiguration: getSingleConfiguration,
  createConfiguration: createConfiguration,
  updateConfiguration: updateConfiguration,
  removeConfiguration: removeConfiguration
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
function getAllConfigurations(req, res, next) {
  if (validate(req, res)) {
    db.any('select * from Configuration')
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
function getSingleConfiguration(req, res, next) {
  if (validate(req, res)) {
    const ConfigurationID = parseInt(req.params.id);
    db.one('select * from Configuration where id = $1', ConfigurationID)
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
function createConfiguration(req, res, next) {
  if (validate(req, res)) {
    req.body.user_id = parseInt(req.body.user_id);
    db.none('insert into Configuration(volume, vibration, user_id)' +
        'values(true, true, ${user_id})',
        req.body)
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Configuration'
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
function updateConfiguration(req, res, next) {
  if (validate(req, res)) {
    db.none('update Configuration set volume=$1, vibration=$2 where user_id=$3', [(req.body.volume == 'true'), (req.body.vibration == 'true'), parseInt(req.params.id)])
      .then(function() {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Configuration'
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
function removeConfiguration(req, res, next) {
  if (validate(req, res)) {
    const ConfigurationID = parseInt(req.params.id);
    db.result('delete from Configuration where user_id = $1', ConfigurationID)
      .then(function(result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Configurations`
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
