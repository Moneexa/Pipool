const path = require('path');

const express = require('express');

const app = new express();

app.use('/', express.static('static'));

app.listen(3001, () => {
    console.log('App listening on port 3001')
});