module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/api/users')
    .get(userController.getAllUsers);
}