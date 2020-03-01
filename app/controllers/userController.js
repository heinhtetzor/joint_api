let User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) res.send(err);
    res.json({ success: 'true', data: users});
  })
}