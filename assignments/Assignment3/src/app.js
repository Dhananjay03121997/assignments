let express = require('express');
let app = express();
require('./db/db');

let customer = require('./routing/Customer');

app.use(express.json());
app.use(customer);

app.get('/', (req, res) => {
    res.status(200).send("App is running");
})

module.exports = app;