const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//Stories Index
router.get('/', (req, res) => {
    res.render('stories/index');
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
    res.render('stories/show');
});

module.exports = router;