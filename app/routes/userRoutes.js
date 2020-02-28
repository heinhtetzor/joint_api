module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/api/register')
    .post(userController.register);
  
    app.route('/api/auth')
      .post(userController.login);
}