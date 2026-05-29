// standardized response funciont
const {createUser1} = require("../models/userModel");


const handleResponse = (res, status, message, data=null)=>{


    console.log("Here is the response inside the handleresponse", res);
    res.status(status).json({
            status,
            message,
            data,
    });
};


 const createUser = async (req,res,next)=>{

    const {name, email} =req.body;
    // console.log(name,email);

    try{
        const newUser = await createUser1(name,email);
        console.log("Here is the new user ", newUser);
        handleResponse(res, 201, "User created successfully", newUser);
    }
    catch(error)
    {
        console.log(error);
        // handleResponse(res, 500, "Internal Server Error");
    }





}

module.exports ={createUser}