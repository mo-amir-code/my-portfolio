import { connectToDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const data = await request.json();
    await connectToDB()

    try {
        // console.log("[DEBUG] Blog Data:", data);
        if (data._id) {
            const blogId = data._id;
            delete data._id;

            const blog = await Blog.findByIdAndUpdate(blogId, data, { new: true });

            // revalidating
            revalidatePath(`/blog/${blog?.slug}`)
            revalidateTag("blog-posts")

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