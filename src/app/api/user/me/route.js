import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { connectMongo } from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        connectMongo();
        const userData = await getDataFromToken(request);
        const user = await User.findOne({ _id: userData.id }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user,
        })
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: error.message
        })
    }
}