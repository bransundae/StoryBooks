const mongoose = require('mongoose');
const express = require('express');
const database = require('./config/database');

const app = express();

//Routes

app.get('/', (req, res) => {
    res.send('Awe');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});