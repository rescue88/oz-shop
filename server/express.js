const express = require('express');
const cors = require('cors');

const app = express();

// default middlewares
app.use(express.json({extended: true}));
app.use(cors());

// listen to a base url and call routers
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));

module.exports = app;