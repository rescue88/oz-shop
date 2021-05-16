const express = require('express');
const cors = require('cors');

const app = express();

// default middlewares
app.use(express.json({extended: true}));
app.use(cors());

// listen to a base url and call routers
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/discount', require('./routes/discount.routes'));
app.use('/api/rating', require('./routes/rating.routes'));
app.use('/api/comment', require('./routes/comment.routes'));

module.exports = app;