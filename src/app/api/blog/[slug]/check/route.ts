import { connectToDB } from "@/lib/db"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"

type Params = {
    slug: string
}

export async function GET(_request: Request, context: { params: Params }) {
    const slug = context.params.slug // '1'

    let res = { exist: false }

    await connectToDB()

    try {
        const blog = await Blog.findOne({ slug })
        if (!blog) {
            res["exist"] = true;
        }
    } catch (error) {
        console.log(`[DEBUG] Occurred while checking slug: ${error}`)
        throw error
    }

    return NextResponse.json(res);
}