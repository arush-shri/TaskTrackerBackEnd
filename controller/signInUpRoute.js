const express = require("express");
const { initiateSignin, initiateSignup } = require("./SignInUp")
const signRoute = express.Router();
const jwt = require('jsonwebtoken');
const cors = require("cors");
express.use(cors({
    origin: '*',
}));

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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', false);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if(req.method === 'OPTIONS') {
        return res.status(200).json(({
            body: "OK"
        }))
    }

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