const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const connect = require('./config/DB');
const userRoute = require('./routes/userRoute.js');
const orderRoute = require('./routes/orderRoute');
// const loggedIn = require('./routes/loggedInRoute')
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv/config');

const PORT = process.env.PORT || 7878

// middleware
app.use(cookieParser())
app.use(cors({
    // origin:['http://localhost:5173'],
    origin:true,
    credentials:true
}))
app.use(express.json())
// mongoDB connect
connect()

// routes
app.get('/',(req,res)=>{
    res.send('welcome home')
})
app.use('/auth',userRoute);
app.use('/order',orderRoute)
// app.use('/check',loggedIn)

// Server
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})