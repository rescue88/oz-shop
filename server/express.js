const express = require('express');

const app = express();

// default middlewares
app.use(express.json({extended: true}));

// listen to a base url and call routers
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));

module.exports = app;