const { validationResult } = require("express-validator");
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { hashing, hashValidation } = require("../middleware/hashing");
const saltRound = 10

require('dotenv').config();
const User = db.User;

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

exports.singleUser = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id)
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