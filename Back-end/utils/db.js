// const mongoose = require("mongoose");
// const { connect } = require("../router/auth-router");

// const URI = process.env.MONGODB_URI;

// const connectDB = async() => {
//     try{
//         await mongoose.connect(URI);
//         console.log('Connection successful to databse'); 

//     } catch(error)
//     {
//         console.log("Database connection failed!");
//         process.exit(0);
//     }
// }

// module.exports = connectDB;

const mongoose = require("mongoose");
const { connect } = require("../router/auth-router");

const URI = process.env.MONGODB_URI;

const connectDB = async() => {
    try{
        await mongoose.connect(URI);
        console.log('Connection successful to databse'); 

    } catch(error)
    {
        console.log("Database connection failed!");
        process.exit(0);
    }
}

module.exports = connectDB;