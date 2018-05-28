const express = require('express');
const router = express.Router();

const users = require('../controllers/userController');
const type_users = require('../controllers/typeUsersController');

router.get('/users/', users.getAllUsers);
router.get('/users/:id', users.getSingleUser);
router.post('/users', users.createUser);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.removeUser);

router.get('/type_users/', type_users.getAllTypes);
router.get('/type_users/:id', type_users.getSingleType);
router.post('/type_users', type_users.createType);
router.put('/type_users/:id', type_users.updateType);
router.delete('/type_users/:id', type_users.removeType);


module.exports = router;
