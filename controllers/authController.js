const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const db = require('../db');

function ingresar(req, res, next) {
  const userMail = req.body.mail;
  const userPass = req.body.password;
  db.one('select * from users where mail = $1', userMail)
    .then(function(data) {
      if (bcrypt.compareSync(userPass, data.password)) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            token: jwt.sign({
              id: data
            }, config.pass, {
              expiresIn: "2 days"
            })
          });
      } else {
        res.status(500)
          .json({
            status: 'error',
            type: 1 //No coincidian las claves
          });
      }
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          type: 0 //No se encuentra en la base de datos
        });
    });
}

function autentificarAccion(JWT) {
  return jwt.verify(JWT, config.pass, function(err, decoded) {
    return typeof decoded != "undefined";
  });
}

module.exports = {
  ingresar,
  autentificarAccion
}
