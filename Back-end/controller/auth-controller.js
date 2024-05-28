const User = require("../model/user-model")
const bcrypt = require("bcryptjs");  

const home = async(req, res) => {
    try{
        res
        .status(200)
        .send("Welcome to the auth-controllers!!");
            SVGAnimatedEnumeration
    } catch(error) {
        console.log(error);
    }
}

const register = async(req, res) => {
    try{
        console.log(req.body);

        const {username, email, password} = req.body;
        
        const userExist = await User.findOne({ email});
        if(userExist) return  res.status(400).json({message : "Emial already exist!"});
    

        const user_created =  await User.create({username, email, password});
        res.status(201).json(
        {
            message : "Registration Successful!", 
            token : await user_created.generateToken(), 
            userId : await user_created._id.toString(),
        });

    } catch(error) {
        // res.status(500).json("Internal server error!!");
        next(error);
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user_exist = await User.findOne({email}); //user_exist contain complete user data
        if(!user_exist) return res.status(400).json({message : "Email does not exist, Register first!!"});

        //if user exist then we have to copmare password with saved password when user registered.

        // const user_chk = await user_exist.comp_pass(password); //password that is entered by user on body is passes as an argument
        const user_chk = await bcrypt.compare(password,user_exist.password);

        if(user_chk)
        {
            res.status(201).json({
                message : "Login Successful!", 
                token : await user_exist.generateToken(), 
                userId : await user_exist._id.toString(),
            });
        } 
        else res.status(401).json({message : "Invalid email or password!"});
            
    } catch(error) {
        // res.status(500).json("Internal server error!!")
        next(error);
    }
}

const user = async(req,res) => {
        try{
            const data = req.user;
            // console.log(data);
            return res.status(200).json({data});
    
        }catch(err){
            // console.log("Error form the user Route!");
            next(err);
        }
}

const userList = async(req,res) => {
    try{

        const data = await User.find();

        if(!data || data.length==0) return res.status(404).json({message : "No user found"});

        // console.log(data);

        return res.status(200).json({message : data});

    }catch(err){
        // console.log("Error form the users Route!");
        next(err);
    }
}

const deleteUser = async(req,res) => {
    try{
        const id = req.params.id;
        await User.deleteOne({_id : id});
        return res.status(200).json("message : User deleted successfully");

    }catch(err){
        next(err);
    }
}

const updateUser = async(req,res) => {
    try{
        const id = req.params.id;
        const data = req.body; //data on adminUpdate page entered by admin

        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(data.password, saltRound);
        data.password = hash_password;

        const updatedData = await User.updateOne({_id : id}, {$set : data} );

        // console.log(updatedData);
        return res.status(200).json(updatedData);

    }catch(err){
        next(err);
    }
}

const addUser = async(req,res) => {
    try{

        const {username, email, password} = req.body;
        
        const userExist = await User.findOne({ email});
        if(userExist) return  res.status(400).json({message : "Emial already exist!"});
    
        const user_created =  await User.create({username, email, password});
        return res.status(200).json("message : User added successfully");
        
    }catch(err){
        next(err);
    }
}

module.exports = {home, register, login, user, userList, deleteUser, updateUser, addUser}; 
