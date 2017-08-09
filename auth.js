import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

module.exports = app => {
  const Users = app.db.models.Users;
  const cfg = app.libs.config;
    // secretOrKey verifies the JWT token's signature
    // jwtFromRequest is a func that returns the JWT as a string or null
  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };
  // params obj -> controls how the token is extracted from the request
    // params -> into -> payload
      // payload -> contains the decoded jwt payload
  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(err => done(err, null));
  });
    // inject the middleware
  passport.use(strategy);
  return {
    // start passport
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      // authenticates the access for a route
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};