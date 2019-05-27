const mongoose = require('mongoose');
const express = require('express');
const database = require('./config/database');
const passport = require('passport');
const keys = require('./config/keys');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');

const app = express();

//Load Routes

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');

//Load Middleware

    //Express-Session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    }));

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

    //Global Variables
    app.use((req, res, next) => {
        //res.locals.success_msg = req.flash('success_msg');
        //res.locals.error_msg = req.flash('error_msg');
        //res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    //Handlebars
    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

//Enable Routes
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

//Port and Server

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});