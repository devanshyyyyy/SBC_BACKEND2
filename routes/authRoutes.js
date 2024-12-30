const express = require("express");
const { validateRequestBody } = require('../middleware/authMiddleware');  // Importing validateRequestBody middleware
const {SignUp,SignIn} = require("../controllers/userController");

const app = express.Router();

//User
app.post('/signup', validateRequestBody(['username', 'email', 'password']), SignUp);
app.post('/signin', validateRequestBody(['email', 'password']), SignIn);

module.exports = app;