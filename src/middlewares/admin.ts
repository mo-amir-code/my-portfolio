import { verifyJWTToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


const adminMiddleware = async (request: NextRequest) => {
    const auth_token = request.cookies.get("auth_token")?.value

    if (!auth_token) {
        return NextResponse.redirect("/admin/auth")
    }

    const response = await verifyJWTToken(auth_token)

    if (!response.valid) {
        return NextResponse.redirect("/admin/auth")
    }

    return NextResponse.next()
}

export default adminMiddleware