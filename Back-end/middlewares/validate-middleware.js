const validate = (schema) => async(req,res,next) =>{
    try{
        const pasrse_body = await schema.parseAsync(req.body);
        req.body = pasrse_body;
        return next();

    }catch(err){

        const status = 422;
        const message = "Fill the input properly!";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails, 
        };

        console.log(error);

        next(error);
        // res.status(400).json({msg});
    }
}

module.exports = validate;





