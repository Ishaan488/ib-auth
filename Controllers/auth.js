import express from "express";
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt, { compare } from 'bcryptjs';
import { User } from '../Models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { name, username, email, password, profileImageUrl} = req.body;
    if (name == "" || username == "" || password == "") {
        return res.json({ message: "All fields required!" });
    }
    else {
        let usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "This username already exists. Please try another!" });
        }
        const hasUppercase = /[A-Z]/.test(password);         // Checks for uppercase letters
        const hasLowercase = /[a-z]/.test(password);         // Checks for lowercase letters
        const hasDigit = /[0-9]/.test(password);             // Checks for numbers
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for special characters
        if (hasUppercase == false) {
            return res.json({ message: "Enter atleast one uppercase letter!" });
        }
        if (hasLowercase == false) {
            return res.json({ message: "Enter atleast one lowercase letter!" });
        }
        if (hasDigit == false) {
            return res.json({ message: "Enter atleast one numerical character!" });
        }
        if (hasSpecialChar == false) {
            return res.json({ message: "Enter atleast one special character!" });
        }
        if (password.length < 8) {
            return res.json({ message: "Password should contain 8 or more characters!" });
        }
    }
     const cloudinaryRes=await cloudinary.uploader.upload(profileImageUrl,{
          folder:"/ib-auth-users"
    })
    const hashPassword=await bcrypt.hash(password,10);
    await User.create({ name, username, email, password:hashPassword, profileImageUrl:cloudinaryRes.secure_url });
    res.json({ message: "Registered successfully." });

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    let currentUser;
    if (email == "" || password == "") {
        return res.json({ message: "All fields required!" });
    }
    else {
        currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res.json({ message: "Email not registered" });
        }
        // console.log(currentUser);
        let passwordCheck=await bcrypt.compare(password,currentUser.password);
        if (!passwordCheck) {
            return res.json({ message: "Incorrect password!" });
        }
    }
    const username=currentUser.username;
    //generate jwt token
    const token = jwt.sign({ username }, `${process.env.jwt_secretkey}`, { expiresIn: '1h' });
    console.log(token);
    
    return res.json({ message: "Logged in successfully.",token:token });
}