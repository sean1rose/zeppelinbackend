describe('Routes: Token', () => {
  const Users = app.db.models.Users;
  describe('POST /token', () => {
    beforeEach(done => {
      // runs before each test
        // need to clear user table then create 1 valid user..
          // Users.destroy() and then Users.create()
      // console.log('user - ', Users);
      Users
        .destroy({where: {}})
        .then(() => Users.create({
          name: "John",
          email: "john@mail.com",
          password: "test1234"
        }))
        .then(() => {
          console.log('GOT IN BEFORE EACH CALLBACK');
          done();
        });
    });
    describe('status 200', () => {
      it("returns authenticated user token", done => {
        request.post('/token')
          .send({
            email: "john@mail.com",
            password: "test1234"
          })
          .expect(200)
          .end((err, res) => {
            console.log('got to 200 end, res.body - ', res.body);
            expect(res.body).to.include.keys("token")
            done(err);
          });
      });
    });
    describe('status 401', () => {
      it("throws error when password is incorrect", done => {
        // test logic
        request.post('/token')
          .send({
            email: "john@mail.com",
            password: "wrongpassword"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email doesn't exist", done => {
        // test logic
        request.post('/token')
          .send({
            email: "email@doesntexist.com",
            password: "test1234"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email and password are blank", done => {
        // test logic
        request.post('/token')
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});