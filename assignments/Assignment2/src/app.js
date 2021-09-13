let express = require('express');
let app = express();
require('./db/db');

let subject = require('./routing/Subjects');
let student = require('./routing/Student');

app.use(express.json());
app.use(subject);
app.use(student);

app.get('/', (req, res) => {
    res.status(200).send("App is running");
})

module.exports = app;