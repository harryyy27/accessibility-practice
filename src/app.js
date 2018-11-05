const express = require('express');
const path = require('path');
const app = express();
const bodyparser= require('body-parser');

app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;