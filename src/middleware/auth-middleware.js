import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => { 
    const token = req.get("Authorization");
        if(!token) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            const user = await prismaClient.user.findFirst({
                where: {
                    token: token
                }
            }); //  TODO: check token valid
        if(!user){
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
           req.user = user;
                next();
            }
    }
    
}