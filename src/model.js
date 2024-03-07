import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.method.verifyPassword = (pw) => {

    return bcrypt.compareSync(pw, this.password);
}

export const User = mongoose.model("User", userSchema);
