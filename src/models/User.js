import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'please provide a username'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'user'],
    },
}, {
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;

// Accessing the enum values
const roles = User.schema.path('role').enumValues;