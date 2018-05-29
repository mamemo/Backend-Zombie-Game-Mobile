const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.post('/ingresar', auth.ingresar);

module.exports = router;
