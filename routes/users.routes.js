const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware')

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', authLoginUserMiddleware, usersController.signup);
router.post('/login',  authLoginUserMiddleware, usersController.login);
router.get('/mypage')

module.exports = router;