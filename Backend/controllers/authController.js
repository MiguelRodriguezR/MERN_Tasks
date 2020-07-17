const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: "User doesn't exist"});
        }

        const passOk = await bcryptjs.compare(password, user.password);
        if(!passOk){
            return res.status(400).json({ msg: "Password or Email doesn't match"});
        }

        //create token
        const payload = {
            user:{
                id: user.id
            }
        }

        //sign token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (ERROR,token) => {
            if(ERROR) throw ERROR

            res.json({ token });
        })

    } catch (error) {
        console.log(error);
    } 

}

exports.loggedUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "error"});
    }

}