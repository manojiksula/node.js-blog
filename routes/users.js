const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../config/passport')(passport);


router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                req.flash('error_msg', 'User is already registered !');
                res.redirect('/user/register');
            } else {

                const newUser = {
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };

            if(newUser.password === req.body.passwordc) {

                bcrypt.genSalt(10, (err, salt) => {
                    if(err) {
                        return console.log(err);
                    }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        return console.log(err);
                    }
                    newUser.password = hash;

                    new User(newUser).save()
                                    .then(() => {
                                        req.flash('success_msg', 'You can now login !');
                                        res.redirect('/user/login');
                                    })
                                    .catch(err => console.log(err));
                    });
                });
                } else {
                    res.send('Incorrect passwords.');
                }
            }
        })
        .catch(err => console.log(err));
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/articles',
      failureFlash: true,
      failureRedirect: '/user/login'
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out !');
    res.redirect('/');
});

module.exports = router;