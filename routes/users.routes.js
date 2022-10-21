const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', authMiddleware, usersController.signup);
router.post('/login',  authMiddleware, usersController.login);
router.get('/mypage')

module.exports = router;