import jwt from "jsonwebtoken";

const validateAuth = (req,resp ,next)=>
    {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token)
            {
            return        resp.json({message: "No token found"});
            }
        const decode = jwt.verify(token,"Harshit@8406");
        console.log(decode);
        req.user = decode;
        next();
        // resp.json({decodeData : req.user})
    }

export default validateAuth;
