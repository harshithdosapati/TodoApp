const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to Database
const db = config.get('mongoURI');

mongoose
  .connect(db)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

app.use('/api/todos', require('./routes/api/todos'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server started on port ${port}`));