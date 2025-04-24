const User = require("../models/User");
//Il a pris le model de user d'un folder qui models pour s'avoir qui le user qui envoyer une resquest
const JwtStrategy = require("passport-jwt").Strategy;
//L'authentification avec JWT 
const ExtractJwt = require("passport-jwt").ExtractJwt;
//Pour lire el token de la part de L'header 
const passport = require("passport");
//appel pour la bibliothque de l'authentification 
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SecretOrKey,
  //Pour lire token (=ID & crypté  ) de la part de header , secrectkey pour faire le decode de token  
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload._id }).select("-password")
      //appel au user qui a un ID qui au token 
      console.log(user)
      user ? done(null, user) : done(null, false);
      //comme si , sinon , si l'utlisateur est là sinon il faire un stop pour la route et revient unauthorized
    } catch (error) {
      console.log(error);
    }
  })
);
module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
// middleware s'appel isAuth()

//Token ykhallek tconnecta mara wa7da, w middleware y9rah fi kol request bech y3ayetlek route kan enti authentifié w heya ta3wen 3le sécurtié 