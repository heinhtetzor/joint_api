var bcrypt = require("bcrypt");
var User = require('../models/User');

exports.register = async function (req, res) {

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send('User Already existed');

  const { name, email, password, avatar_url, bio, interested_fields } = req.body;
  user = new User({
    name,
    email,
    password,
    avatar_url,
    bio,
    interested_fields,
    createDate: Date.now,
  });

  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
}