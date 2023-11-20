const express = require('express');
const router = express.Router();
const { getMe } = require('./EditProfile');

router.get('/getUserDetails/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const userDetails = await getMe(email);
        if (userDetails === "User not found" || userDetails === "Error fetching user details") {
            res.status(404).json({ error: userDetails });
        } else {
            res.status(200).json(userDetails);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;