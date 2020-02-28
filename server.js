var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 8000,
  cors = require('cors');

var userRoutes = require('./app/routes/userRoutes');

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

var url = 'mongodb://localhost:27017/joint';

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
userRoutes(app);

app.listen(PORT, () => console.log(`We are live on ${PORT}`));