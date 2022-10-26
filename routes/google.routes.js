const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Users } = require('../models');

// 구글로그인
const googleCallback = (req, res, next) => {
  try {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    passport.authenticate(
      'google',
      { failureRedirect: '/login' }, // 실패하면 '/login''로 돌아감.
      async (err, user, info) => {
        if (err) return next(err);
        console.log(user);

        const { userId, nickname } = user;
        console.log(userId, nickname)

        const accessToken = jwt.sign(
          { userId: userId },
          process.env.SECRET_KEY,
          { expiresIn: '3h' }
        );
        const refreshToken = jwt.sign(
          { userId: userId },
          process.env.SECRET_KEY,
          { expiresIn: '5h' }
        );

        await Users.update(
          { refreshToken },
          { where: { userId: userId } }
        );

        res.cookie('refreshToken', refreshToken);
        res.cookie('accessToken', accessToken);

        result = { userId, accessToken, refreshToken, nickname };
        res.status(201).json({
          user: result,
          msg: '구글 로그인 성공!',
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
); // 프로필과 이메일 정보를 받음.
// 구글 서버 로그인이 되면, redicrect url을 통해 요청 재전달
router.get('/test/callback', googleCallback);

module.exports = router;