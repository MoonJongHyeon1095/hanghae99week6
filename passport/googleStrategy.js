require('dotenv').config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../models');

// 구글 로그인
module.exports = () => {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },

      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: 'google' },
          });
          console.log(profile.emails[0].value)
          if (exUser) {
            done(null, exUser);
          } else {
            const newUSer = await Users.create({
              snsId: profile.id,
              nickname: profile.displayName,
              provider: 'google',
              point: 0,
              email: profile.emails[0].value
            });
            done(null, newUSer);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};