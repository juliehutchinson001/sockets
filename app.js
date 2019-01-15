const express = require('express');
const bodyParser = require('body-parser');
const setupEnvironmentVars = require('./config/config');

setupEnvironmentVars();
const app = express();

// Setup middleware
app.use(bodyParser.json());

module.exports = app;
