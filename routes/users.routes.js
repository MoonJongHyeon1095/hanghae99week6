const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', authMiddleware,  usersController.createUser);
router.post('/login',  authMiddleware, usersController.userLogin);
router.get('/mypage')

module.exports = router;