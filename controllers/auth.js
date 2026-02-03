const { validationResult } = require("express-validator");
const db = require('../models');
const jwt = require('jsonwebtoken');
const { hashing, hashValidation } = require("../middleware/hashing");
const saltRound = 10

require('dotenv').config();
const User = db.User;

//Create new User
exports.register = async (req, res) => {
    const errors = validationResult(req);

    // Return validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }

    try {
        const { name, email, password } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ 
                status: 'error',
                msg: 'User with this email already exists.',
            });
        }

        // Hash the password
        const hashedPassword = await hashing(password,saltRound);

        // Create the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
            }
        );

        return res.status(201).json({ 
            status: 'success',
            msg: 'User created successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
};

//Login account user
exports.login = async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            status: 'error',
            msg: 'Validation error',
            errors: error.array()
        })
    }

    try {
        const {email,password} = req.body;
        const user = await User.findOne({where: {email}});

        const hashPasswordValidtion = await hashValidation(password,user.password);

        if(!user || !hashPasswordValidtion){
            return res.status(400).json({
                status: 'error',
                msg: 'Invalid credentials',
                errors: [{msg: "Invalid credentails"}]
            })
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        )

        return res.status(200).json({
            status: 'success',
            msg: 'Logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                token
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

//Update user
exports.updateUser = async(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            status: 'error',
            msg: 'Validation error',
            errors: error.array()
        })
    }
    const {id} = req.params;
    try {
        //Checking if json not have body object at all
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(401).json({
                status: 'error',
                msg: 'No information detail provided for update!'
            })
        }

        const {name,email,password} = req.body;

        const findUser = await User.findByPk(id);

        if(!findUser){
            return res.status(404).json({
                status: 'error',
                msg: 'User not found with that ID'
            })
        }

        const existingUser = await User.findOne({where: { email } });
        if (existingUser) {
            return res.status(409).json({ 
                status: 'error',
                msg: 'User with this email already exists.',
            });
        }

        const hashedPassword = await hashing(password,saltRound);

        const values = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const condition = {
            where: {id:id}
        }

        const options = {
            multi: true
        }

        const userUpdated = await User.update(values,condition,options);

        return res.status(201).json({
            status: 'success',
            msg: 'User updated successfully',
            userUpdated: userUpdated[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

//Delete User
exports.deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                status: 'error',
                msg: 'User not found'
            })
        }

        const deleteUser = await User.destroy({
            where: {id:id}
        })

        if(deleteUser < 1){
            return res.status(404).json({
                status: 'error',
                msg: 'User delete not success'
            })
        }

        return res.status(200).json({
            status: 'error',
            msg: 'Deleted user success',
            deleteUser: deleteUser
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

//Get a single user by ID
exports.singleUser = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id)
        if(!user){
            return res.statu(404).json({
                status: 'error',
                msg: 'User not found'
            })
        }

        return res.status(200).json({
            status: 'success',
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            error: error.message
        })
    }
}


//Get all user 
exports.allUser = async (req,res) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        return res.status(200).json({
            status: 'success',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            error: error.message
        })
    }
}