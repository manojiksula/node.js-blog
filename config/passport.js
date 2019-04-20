const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/User');
const User = mongoose.model('User');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email})
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'User Not Found !' });
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) {
                            return console.log(err);
                        } else {
                            if(isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: 'Passwords do not match !' });
                            }
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}