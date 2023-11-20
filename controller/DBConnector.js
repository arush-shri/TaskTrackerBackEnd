
var url = "mongodb+srv://shriarush:MernTaskT0D0@cluster0.t7fbaqi.mongodb.net/?retryWrites=true&w=majority";       // TO CHANGE TO ORIGINAL URL
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