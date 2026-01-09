import { connectToDB } from "@/lib/db"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"

type Params = {
    slug: string
}

export async function GET(_request: Request, context: { params: Params }) {
    // console.log(`[DEBUG] Context: ${JSON.stringify(context)}`)
    const slug = context.params.slug // '1'
    const { searchParams } = new URL(_request.url);
    const blogId = searchParams.get("blogId");

    let res = { exist: false }

    await connectToDB()

    try {
        const query: any = { slug }

        if (blogId) {
            query._id = { $ne: blogId }
        }

        const blog = await Blog.findOne(query)
        
        if (!blog) {
            res["exist"] = true;
        }
    } catch (error) {
        console.log(`[DEBUG] Occurred while checking slug: ${error}`)
        throw error
    }

    return NextResponse.json(res);
}