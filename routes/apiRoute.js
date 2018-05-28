var express = require('express');
var router = express.Router();

var users = require('../controllers/userController');


router.get('/users/', users.getAllUsers);
router.get('/users/:id', users.getSingleUser);
router.post('/users', users.createUser);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.removeUser);


module.exports = router;
