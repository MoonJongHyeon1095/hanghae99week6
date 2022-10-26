require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { Users } = require("../models");

module.exports = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "email"],
        passReqToCallback: true,
      },

      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: "facebook" },
          });
          console.log(profile.emails[0].value);
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await Users.create({
              snsId: profile.id,
              nickname: profile.displayName,
              provider: "facebook",
              email: profile.emails[0].value,
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
