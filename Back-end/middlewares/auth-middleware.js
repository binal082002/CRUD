const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

const authMiddleware =async (req, res, next) =>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({message : "Unauthorized HTTP, Token not provided!"});
    }

    // token is in formate "Bearer <JWT>" , so removing "Bearer" prefix
    const jwtToken = token.replace("Bearer", "").trim();
    // console.log("token" , jwtToken);

    try{
        const isVerified = jwt.verify(jwtToken,process.env.SECRET_KEY); //it will return the payload that we define when we generated the token

        const userData = await User.findOne({email : isVerified.email}).select({password : 0}); //findOne will return whole userdata related to given email id, and we set "password : 0" to not to share it
        // console.log(userData);

        //setting the custom properties upon request
        req.user = userData;
        req.token = token; //token that we read from header
        req.userID = userData._id;

        next();

    }catch(err){
        return res.status(401).json({message : "Unauthorized HTTP, Token not provided!"});
    }
}

module.exports = authMiddleware;
