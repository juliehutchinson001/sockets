const app = require('./app');
const path = require('path');
const express = require('express');
const { connectMongoose } = require('./db/mongoose');

connectMongoose();

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
console.log(publicPath);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
