const express = require("express");
const { initiateSignin, initiateSignup } = require("./SignInUp")
const signRoute = express.Router();
const jwt = require('jsonwebtoken');

signRoute.post("/login", async (req, res) => {
    const result = await initiateSignin(req.body.email, req.body.password)
    
    if(result === true){
        const { createHash } = require('crypto');
        const secret = createHash('sha256').update(req.body.email).digest('hex');
        const token = jwt.sign({ userId: req.body.email }, secret, { expiresIn: '4h' });
        res.json({ token });
    }
    else{
        res.send(result)
    }
})

signRoute.post("/signup", async (req, res) => {
    const result = await initiateSignup(req.body.email, req.body.password, req.body.uname, req.body.phoneNum, req.body.age)
    if(result === true){
        const { createHash } = require('crypto');
        const secret = createHash('sha256').update(req.body.email).digest('hex');
        const token = jwt.sign({ userId: req.body.email }, secret, { expiresIn: '4h' });
        res.json({ token });
    }
    else{
        res.send(result) 
    }
})

module.exports = signRoute;