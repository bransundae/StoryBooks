const mongoose = require('mongoose');
const express = require('express');
const database = require('./config/database');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

//Load Routes

const users = require('./routes/users');
const auth = require('./routes/auth');

//Load Middleware

    //Passport
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport')(passport);

    //Mongoose
    mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true        
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Routes

app.get('/', (req, res) => {
    res.send('Awe');
});

app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});