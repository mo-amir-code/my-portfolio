import Blog from "@/models/Blog";
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const data = await request.json();

    try {
        console.log("[DEBUG] Blog Data:", data);
        await Blog.create(data);
        return NextResponse.json({ status: 201, message: "Blog created successfully" })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Server error" })
    }
}

export async function GET(_request: Request) {
    try {
        const blogs = await Blog.find().sort({ publishedAt: -1 });
        return NextResponse.json({ status: 200, blogs })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Server error" })
    }
}