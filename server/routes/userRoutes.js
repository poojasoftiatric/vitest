const express = require('express');
const { register, login, getUserCount } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/count', getUserCount);

module.exports = router;
