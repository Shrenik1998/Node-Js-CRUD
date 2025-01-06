//mongoose is orm tool for mongodb
const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/person";


//connection with mongodb
const connectDB = ()=>{mongoose.connect(uri)
    .then(() => {
        console.log("Successfully connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });}

module.exports = connectDB;