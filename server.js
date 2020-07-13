const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./auth/auth-router.js');
const lyricsRouter = require('./lyrics/lyrics-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api', lyricsRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;