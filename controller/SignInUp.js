
const { createHash } = require('crypto');
const { database } = require('./DBConnector');

function hasher(password) {
    return createHash('sha256').update(password).digest('hex');
}

async function initiateSignin(email, password){
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        return user.data.password  === passwd;
    }
    else{
        return "User does not exist";
    }
    
}

async function initiateSignup(email, password, name, phoneNumber, age){
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        return "User already exists"
    }
    else{
        const userData = {
            "emailId": email, 
            "data": {
                password: passwd,
                username: name,
                phoneNumber: phoneNumber,
                userAge: age 
            } 
        }
        try {
            const result = await usersDB.insertOne(userData);
            await database.collection("tasks").insertOne({"emailId" : email, "tasks" : []})
            return true; // Indicates successful signup
        } catch (err) {
            console.log(err)
            return err; // Indicates an error
        }
    }
}

module.exports = {initiateSignin, initiateSignup, hasher}