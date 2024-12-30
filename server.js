const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes")



const { validateRequestBody, authenticateToken, errorHandler } = require('./middleware/authMiddleware'); // Importing the middlewares
const { SignUp, SignIn } = require('./controllers/userController');
const connectMongoDB = require('./config/db'); //MongoDB connection
const app = express();
const PORT = 7001;

// Connect to MongoDB
connectMongoDB();

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/espdevices",deviceRoutes)
app.use(cors());


// Middleware to parse JSON body
app.use(express.json());

// Define routes
app.post('/signup', validateRequestBody(['username', 'email', 'password']), SignUp); // Use middleware to validate body
app.post('/signin', SignIn); // Validate signin body
app.get('/profile', authenticateToken, (req, res) => {
    // Example profile route that needs authentication
    res.json({ message: 'User profile', user: req.user });
});

// Global error handler middleware should be added after all routes
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


