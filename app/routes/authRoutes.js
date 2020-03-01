module.exports = function(app) {
  var authController = require('../controllers/authController');

  app.route('/api/register')
    .post(authController.register);
  
    app.route('/api/auth')
      .post(authController.login);
}