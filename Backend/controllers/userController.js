const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{

        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({msg: 'User already exist'})
        }
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        user = new User(req.body);
        await user.save();

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

    }catch(error){
        console.log(error);
        res.status(400).send("There's an error");
    }
}