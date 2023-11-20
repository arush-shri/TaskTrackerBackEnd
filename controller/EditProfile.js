const { database} = require('./DBConnector');

async function changePassword(email, password){
    const passwd = hasher(password);
    const usersCollection = database.collection("users");
    const filter = { "emailId": email };
    const updateQuery = {
        $set: {
            "data.password": passwd,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        return "Password updated successfully";
    } else {
        return "There was an error while updating you password";
    }
}

async function changePhoneNumber(email, phoneNumber){
    const usersCollection = database.collection("users");
    const filter = { "emailId": email };
    const updateQuery = {
        $set: {
            "data.phoneNumber": phoneNumber,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        return "Phone number updated successfully";
    } else {
        return "There was an error while updating you phone number";
    }
}

async function getMe(email) {
    const usersCollection = database.collection("users");
    const filter = { "emailId": email };

    try {
        const user = await usersCollection.findOne(filter);

        if (user) {
            const userDetails = user.data;
            return userDetails;
        } else {
            return "User not found";
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        return "Error fetching user details";
    }
}

module.exports = { changePassword, changePhoneNumber, getMe };
