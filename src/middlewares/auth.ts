import { verifyJWTToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


const authMiddleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl

    if (pathname === "/api/blog" && request.method === "GET") {
        return NextResponse.next();
    }

    const auth_token = request.cookies.get("auth_token")?.value

    console.log("[DEBUG] TOKEN: ", auth_token)

    if (!auth_token) {
        return NextResponse.json({ message: "unauthorized request" }, { status: 401 })
    }

    const response = await verifyJWTToken(auth_token)

    // console.log("[DEBUG] RESPONSE: ", response)

    if (!response.valid) {
        const res = NextResponse.json({ message: "token is invalid" }, { status: 400 })
        res.cookies.set("auth_token", "", { path: "/", maxAge: 0 })
        return res;
    }
}

export default authMiddleware