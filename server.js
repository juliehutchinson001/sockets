const app = require('./app');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
console.log(publicPath);

const server = http.createServer(app)
const io = socketIO(server);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server listening on port ${port}`));
