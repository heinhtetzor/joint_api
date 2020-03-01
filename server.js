var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 8000,
  cors = require('cors')
  require('dotenv').config();

var authRoutes = require('./app/routes/authRoutes');
var userRoutes = require('./app/routes/userRoutes');

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// var url = 'mongodb://localhost:27017/joint';
var url = `mongodb://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@ds239797.mlab.com:39797/joint`;

if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  console.log("DB URL ", url);
  mongoose.connect(url, options);
  const db = mongoose.connection;
  db.on('error', err => {
    throw new Error(`Unable to connect to database at ${url} err`);
  });

  db.once('open', function () {
    console.log('Database is connected');
  });
}

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
authRoutes(app);
userRoutes(app);

app.listen(PORT, () => console.log(`We are live on ${PORT}`));
