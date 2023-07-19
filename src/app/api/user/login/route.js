import { connectMongo } from "@/utils/dbconnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        await connectMongo()
        const user = await User.findOne({ email: email });

        if (user) {

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordCorrect) {

                //Create token data
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }

                const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

                const response = NextResponse.json({
                    message: "Login Successful",
                    success: true,
                })

                response.cookies.set("token", token, {
                    httpOnly: true,
                });

                return response;
            } else {
                throw new Error("Wrong credentials");
            }

        } else {
            throw new Error("User not found!");
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error.message,
        })
    }

}