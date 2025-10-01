import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';
function authenticateToken(req, res, next){
    const authHeader = req.header('authorization');
    // const token = authHeader && authHeader.split(' ')[1];
    const token=authHeader;

    if (!token) return res.json({message: "Login First" }); // No token provided

    const decoded=jwt.verify(token, `${process.env.jwt_secretkey}`);
    console.log(decoded);
    const username=decoded.username;
    let user =User.findById(username);
    if (!user){
        return res.json({message:"User not found"});
    }
    // res.json({message:"User verified successfully"});
    req.user=user;
    next();

}

export default authenticateToken;