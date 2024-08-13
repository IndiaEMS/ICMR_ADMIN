import  GoogleStrategy  from 'passport-google-oauth20';
import passport from 'passport';

const  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_URL=process.env.SERVER_URL;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/auth/google/callback`,
    scope : ["profile","email"]
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));


passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user);
})
