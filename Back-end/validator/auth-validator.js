const {z} = require("zod");

//crrating an object schema using zod to validate data structure

const login_schema = z.object({

    email : z
    .string({required_error : "Email is required."})
    .trim()
    .email({message : "Invalid email address."})
    .min(3,{message : "Email must be atleast of 3 characters."})
    .max(255, {message : "Email must not be more than 255 characters."}),

    password : z
    .string({required_error : "Password is required."})
    .trim()
    .min(7,{message : "Password must be atleast of 6 characters."})
    .max(1024, {message : "Password must not be more than 1024 characters."}),

}); 

const signup_schema = login_schema.extend({
    username : z
    .string({required_error : "Name is required."})
    .trim()
    .min(3,{message : "Name must be atleast of 3 characters."})
    .max(255, {message : "Name must not be more than 255 characters."}),

});

module.exports = {signup_schema, login_schema};