const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// SignUp - Create a new user
const SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide username, email, and password" });
        }

        // Validate Gmail email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid Gmail address" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 6);

        // Create a new user
        const result = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        console.log("New User", result);
        return res.status(201).json({ message: "User created successfully", user: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while creating user" });
    }
};


// SignIn - User authentication
const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Access the JWT secret from .env
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "User signed in successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during sign-in" });
    }
};

// Get all users (if needed)
const GetUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

module.exports = { GetUsers, SignUp, SignIn };