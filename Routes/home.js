import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";
import { userDetails } from "../Controllers/userDetails.js";


const router=express.Router();

router.get('/:username/userDetails',userDetails);

export default router;