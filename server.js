const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes")



const app = express();
const PORT = 7000;


//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/espdevices",deviceRoutes)


app.listen(()=>console.log('Server Running on Port',PORT))



