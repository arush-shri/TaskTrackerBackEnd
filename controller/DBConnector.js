
require("dotenv").config();
var url = process.env.DATABASE;       // TO CHANGE TO ORIGINAL URL
const { MongoClient } = require('mongodb');
const client = new MongoClient(url);
const database = client.db("TaskTracker")

client.connect()
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = {
    database
};