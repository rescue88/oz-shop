const mongoose = require('mongoose');
const config = require('config');

const app = require('./express');

// assigning config values
const PORT = config.get('port') || 5000;
const URI = config.get('mongoUri');

async function start() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("Succesfully connected to DB");
    } catch(e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();

// starting application
app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
});