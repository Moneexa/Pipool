var mongoose = require('mongoose');
const express = require('express')
const bodyParser=require('body-parser')
const app = express()


//const cList = require('./Routes/committeeRouter'); // Imports routes for the products

//mongoose.connect('mongodb://localhost/mongoose_basics', { useNewUrlParser: true, useFindAndModify:false});
//var db = mongoose.connection;
//if(!db)
  //  console.log("Error connecting db")
//else
//    console.log("Db connected successfully")

var port = process.env.PORT || 4242;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World with Express'));

//app.use('/api', cList);

app.listen(port, () => console.log('Server running on port 4242!'))