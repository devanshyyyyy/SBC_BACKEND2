const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")



const app = express();
const PORT = 7001;


//routes
app.use("/api/",authRoutes);


app.listen(()=>console.log('Server Running on Port',PORT))



