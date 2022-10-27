require('dotenv').config();
const passport = require('passport');
const KaKaoStrategy = require('passport-kakao').Strategy;
const { Users } = require('../models');

module.exports = () => {
  passport.use(
    new KaKaoStrategy(
      {
        clientID: process.env.CLIENT_ID,
        callbackURL: process.env.CALLBACK_URL,
      },

      // clientID에 카카오 앱 아이디 추가
      // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
      // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
      // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.kakao_account.email
          const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });


          if (exUser) {
            done(null, exUser);
            console.log(exUser, '카카오 로그인 성공!');
          } else {
            const newUser = await Users.create({
              nickname: profile.username,
              snsId: profile.id,
              provider: 'kakao',
              point: 0,
              email:email
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};