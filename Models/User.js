import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true, minlength: 5, trim: true, lowercase: true },
    email: { type: String, require: true, trim: true, lowercase: true },
    password: { type: String, require: true, trim: true, select: true },
    profileImageUrl:{type:String},
    createdAt: { type: String, default: new Date().toLocaleString()}
});

export const User = mongoose.model("User", userSchema);