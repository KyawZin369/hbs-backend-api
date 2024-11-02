
const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

router.post('/api/v1/register', register);

module.exports = router;
