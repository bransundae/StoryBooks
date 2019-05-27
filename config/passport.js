const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('./keys');

//Load User Model
const User = mongoose.model('users');

//Local Strategy
module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email:email
        })
        .then(user => {
            if (!user)
                return done(null, false, {message: 'No User Found'});
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            })
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id, {message: 'Logged in'});
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

//Google Strategy

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            const randomPassword = Math.random().toString(36).slice(-8);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(randomPassword, salt, (err, hash) => {
                    if (err) throw err;
                    const newUser = {
                        googleID: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        password: hash,
                        email: profile.emails[0].value,
                        image: image
                    }
                    User.findOne({
                        googleID: profile.id
                    })
                    .then(user => {
                        if (!user)
                            new User(newUser)
                            .save()
                            .then(user => done(null, user));
                        else
                            return done(null, user);
                    })
                    .catch(err => {return ;});
                });
            });
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id, {message: 'Logged in'});
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}