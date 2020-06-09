var mongoose = require('mongoose');
const express = require('express')
const bodyParser=require('body-parser')
const app = express()

var cors = require('cors');


const loginRoute = require('./auth/login.router'); // Imports routes for the products

mongoose.connect('mongodb://localhost/likeus', { useNewUrlParser: true, useFindAndModify:false});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 4242;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use(cors());

app.use('/api', loginRoute);

app.listen(port, () => console.log('Server running on port 4242!'))