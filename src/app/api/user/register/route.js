import User from "@/models/User";
import bcrypt from "bcryptjs"
import { connectMongo } from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const { username, role, email, password } = await request.json();
        await connectMongo();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({
                status: 400,
                message: "User already exist",
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            role,
            email,
            password: hashedPassword,
        })

        await newUser.save()

        return NextResponse.json({
            status: 200,
            message: "User has been created"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}