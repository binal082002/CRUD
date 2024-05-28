require('dotenv').config(); //to use all variables of env using "process.env"
const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error_middleware');

const authRoute = require("./router/auth-router");

app.use(cors());//we need to define it before fetching the data
app.use(express.json());//Middleware to use json in this file

app.use("/api/auth", authRoute); //it direct to auth-router.js file.

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {

    app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`)
})

});
