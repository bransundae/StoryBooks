const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');

//Load Story Model
require('../models/Story');
const Story = mongoose.model('stories');

//Stories Index
router.get('/', (req, res) => {
    Story.find({status:'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index', {
            stories: stories
        });
    })
});

//Stories Add
router.get('/add',ensureAuthenticated ,(req, res) => {
    res.render('stories/add');
});

//Stories Edit
router.get('/edit',ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
});

//Stories Show
router.get('/show', (req, res) => {
    Story.find({user:req.user.id})
    .populate('users')
    .then(stories => {
        res.render('stories/show', {
            stories: stories
        });
    })
});

//Process Add Stories
router.post('/', (req, res) => {
    let allowComments;

    if (req.body.allowComments)
        allowComments = true;
    else
        allowComments = false;

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Story(newStory)
    .save()
    .then(story => {
        res.redirect(`/stories/show/${stories.id}`)
    });
});

module.exports = router;