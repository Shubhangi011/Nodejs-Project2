const mongoose = require("mongoose");

//Define the mongodb connection url
const mongodbUrl = 'mongodb://127.0.0.1:27017/hotels';

//set up Mongodb connection
mongoose.connect(mongodbUrl)

//Get default mongodb connection
const db=mongoose.connection;

db.on('connected',()=>{
  console.log('Connected to Mongodb!');
});

db.on('error',()=>{
  console.log('Mongodb connection error.');
});

db.on('disconnected',()=>{
  console.log('Mongodb disconnected.');
})



//Export the database connection
module.exports=db;
