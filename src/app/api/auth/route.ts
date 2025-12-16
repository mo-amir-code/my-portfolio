import { generateJWTToken } from "@/lib/utils";
import { adminMiddleware } from "@/middlewares";
import User from "@/models/User";
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    // console.log("START ----> ")
    try {
        const data = await request.json();
        // console.log("START - 2 ----> ")

        if (!data?.email || !data?.password) {
            return NextResponse.json({ message: "Enter all required fields" }, { status: 400 })
        }

        // console.log("DATA: ", data)

        const user = await User.findOne({ email: data.email })

        if (!user) {
            return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
        }

        const isCorrect = await bcrypt.compare(data.password, user.password)

        if (!isCorrect) {
            return NextResponse.json({ message: "Password is incorrect" }, { status: 400 })
        }

        const response = NextResponse.json({
            success: true,
            message: "logged in",
        }, { status: 201 });

        const token = generateJWTToken({ email: data.email })

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 day
        });

        return response
    } catch (error) {
        console.log("ERROR: ", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}


export async function GET(request: NextRequest) {
    try {
        await adminMiddleware(request)
        return NextResponse.json({ message: "authenticated" }, { status: 200 })
    } catch (error) {
        console.log("ERROR: ", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}