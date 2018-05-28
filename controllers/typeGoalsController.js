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
  db.any('select * from type_goals')
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
  db.one('select * from type_goals where id = $1', TypeID)
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
  db.none('insert into type_goals(name, stamina, bullets)' +
      'values(${name},${stamina},${bullets})',
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
  db.none('update type_goals set name=$1, stamina=$2, bullets=$3 where id=$4',
    [req.body.name, req.body.stamina, req.body.bullets, parseInt(req.params.id)])
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
  db.result('delete from type_goals where id = $1', TypeID)
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
