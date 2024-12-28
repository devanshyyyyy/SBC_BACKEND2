const bcrypt = require('bcryptjs');
const Admin = require("../models/adminModel");

// Admin Sign Up route Handler
const Admin_SignUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ Email: email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        const newAdmin = new Admin({
            Name: name,
            Email: email,
            Password: hashedPassword,
        });

        // Save to the database
        const savedAdmin = await newAdmin.save();

        // Respond with success message
        res.status(201).json({
            message: "Admin account created successfully!",
            admin: {
                id: savedAdmin._id,
                name: savedAdmin.Name,
                email: savedAdmin.Email,
                dateOfCreation: savedAdmin.dateOfCreation,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = Admin_SignUp;
