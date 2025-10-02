import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";
import { userDetails } from "../Controllers/userDetails.js";


const router=express.Router();

router.get('/:email/userDetails',userDetails);

export default router;