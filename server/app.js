const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup middleware
app.use(bodyParser.json());

module.exports = app;
