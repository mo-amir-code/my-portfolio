import Blog from "@/models/Blog";
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const data = await request.json();

    try {
        // console.log("[DEBUG] Blog Data:", data);
        if (data._id) {
            const blogId = data._id;
            delete data._id;

            const blog = await Blog.findByIdAndUpdate(blogId, data, { new: true });
            return NextResponse.json({ status: 200, message: "Blog updated successfully", data: { blog } })
        }
        const blog = await Blog.create(data);
        return NextResponse.json({ status: 201, message: "Blog created successfully", data: { blog } })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Server error" })
    }
}

export async function GET(_request: Request) {
    try {
        const blogs = await Blog.find({ status: "publish" }).sort({ publishedAt: -1 });
        return NextResponse.json({ status: 200, blogs })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Server error" })
    }
}