
const express = require("express");
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to My Hotel!');
});

//Import the router files
const personRoutes=require('./router/personRouter');
const menuRoutes=require('./router/MenuRouter');

//Use the router files
app.use('/person',personRoutes);
app.use('/menuItem',menuRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
