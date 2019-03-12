const express = require('express');
const app = express();

const followersRoutes = require('./api/routes/followers');

app.use('/followers',followersRoutes);

module.exports = app