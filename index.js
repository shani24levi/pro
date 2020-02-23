const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


//Conect to DB
const dbConect = require('./dbConect');
dbConect();


// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Routs Middlewares
const Users = require('./routes/Users');
const Apartments = require('./routes/Apartments');
const Requests = require('./routes/Requests');
const Posts = require('./routes/Posts');
const Profile =require('./routes/Profile');
app.use('/api/users', Users);
app.use('/api/profile', Profile);
app.use('/api/apartments', Apartments);
app.use('/api/requsts', Requests);
app.use('/api/posts', Posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

//Listening on port 
app.listen(port, () => console.log(`Server running on port ${port}`));
