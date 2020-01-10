const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});
require('./routes/note.routes')(app);

app.listen(3000, () => {
    console.log("server is listen on port 3000");
});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
