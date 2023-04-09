import passport from 'passport'
import passportGoogle from 'passport-google-oauth2'
import dotenv from 'dotenv'

dotenv.config()
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const GoogleStrategy = passportGoogle.Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/v1/auth/callback/google',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, { profile })
    }
  )
)

export default passport
