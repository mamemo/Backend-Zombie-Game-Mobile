const db = require('../db');

// add query functions
module.exports = {
  getAllTypes: getAllTypes,
  getSingleType: getSingleType,
  createType: createType,
  updateType: updateType,
  removeType: removeType
};

function getAllTypes(req, res, next) {
  db.any('select * from type_users')
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

function getSingleType(req, res, next) {
  const TypeID = parseInt(req.params.id);
  db.one('select * from type_users where id = $1', TypeID)
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

function createType(req, res, next) {
  db.none('insert into users(name)' +
      'values(${name})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Type'
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

function updateType(req, res, next) {
  db.none('update type_users set name=$1 where id=$2',
    [req.body.name, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Type'
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

function removeType(req, res, next) {
  const TypeID = parseInt(req.params.id);
  db.result('delete from type_users where id = $1', TypeID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Types`
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
