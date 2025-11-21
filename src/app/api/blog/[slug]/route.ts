import { connectToDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
    // console.log("[DEBUG] Received GET request for blog: ", params);
    const { slug } = params;
    // console.log("[DEBUG] Fetching blog with slug: ", slug);

    await connectToDB();

    try {
        const blog = await Blog.findOne({ slug })
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Blog fetched", data: { blog } }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch blog", error }, { status: 500 })
    }
}