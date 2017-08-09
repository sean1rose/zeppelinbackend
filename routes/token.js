import jwt from 'jwt-simple';

// token endpoint -> responsible for generating an encoded token w/ a payload
  // payload is granted to a user that sends a valid email and pw
module.exports = app => {
  const cfg = app.libs.config;
  const Users = app.db.models.Users;
  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      // take user-submitted email/pw
      Users.findOne({where: {email: email}})
        .then(user => {
          // find user, and check the password using bcrypt.compareSync (user.password is the hashed/saved password that's associated w/ the email saved in the db)
          if (Users.isPassword(user.password, password)){
            // if pw is valid -> send an encoded jwt token (encoded using secret and jwt-simple library) back to client
            const payload = {id: user.id};
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(err => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};