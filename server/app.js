const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

// Setup middleware
app.use(express.json());
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
console.log(publicPath);

module.exports = http.createServer(app);
