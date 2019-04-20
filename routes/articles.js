const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Article');
const Article = mongoose.model('Article');
const { isAuthorized } = require('../helpers/authenticated');

router.get('/', (req, res) => {
    Article.find({})
        .then(articles => {
            res.render('articles/articles', {
                articles
            });       
        })
        .catch(err => console.log(err));
});

router.get('/add', isAuthorized, (req, res) => {
    res.render('articles/add');
});

router.post('/add', isAuthorized, (req, res) => {

        const newArticle = {
            userID: req.user._id,
            author: req.body.author,
            title: req.body.title,
            body: req.body.body
        };

        new Article(newArticle).save()
                            .then(() => {
                                req.flash('success_msg', 'Article Created !');
                                res.redirect('/articles');
                            })
                            .catch(err => {
                                res.render('articles/add', {
                                    err
                                })
                            });
});

router.get('/user/:id', isAuthorized, (req, res) => {
    Article.find({userID: req.params.id})
            .then(data => {
                res.render('articles/userArticles', {
                    data
                })
            })
            .catch(err => console.log(err));
});

router.get('/edit/:id', isAuthorized, (req, res) => {
    Article.findOne({_id: req.params.id})
            .then(data => {
                res.render('articles/edit', {
                    data
                });
            })
            .catch(err => console.log(err));
});

router.put('/edit/:id', isAuthorized, (req, res) => {
    Article.findOne({_id: req.params.id})
            .then(article => {

                article.author = req.body.author;
                article.title = req.body.title;
                article.body = req.body.body;

                article.save()
                        .then(() => {
                            req.flash('success_msg', 'Article Updated !');
                            res.redirect('/articles')
                        })
                        .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
});

router.delete('/remove/:id', isAuthorized, (req, res) => {
    Article.deleteOne({_id: req.params.id})
            .then(() => {
                req.flash('success_msg', 'Article Deleted !');
                res.redirect('/articles')
            })
            .catch(err => console.log(err));
});

module.exports = router;