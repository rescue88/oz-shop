import mongoose from 'mongoose';

import app from './express.js';
import config from './config/config.js';

// assigning config values
const PORT = config.port;
const URI = config.mongoUri;

// starting application
app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
});

// connecting to DB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
// checking for connection error
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to DB: ${URI}`);
});

// listen to a base url
app.get('/', (req, res) => {
    res.status(200).send('<div><h1>Server is working</h1></div>');
});