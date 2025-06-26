const express = require('express');
const authController = require('../controllers/auth'); //importing User controller



const authRouter = express.Router(); //creating a router for Users

authRouter
    .post('/signUp', authController.addUser)
    .post('/login', authController.login);

exports.authRouter = authRouter; //exporting the auth router