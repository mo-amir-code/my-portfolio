import { uploadOnR2 } from "@/lib/r2";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("image") as File

    console.log(`[DEBUG] File: ${file}`)

    if (file) {
        try {
            // console.log("Uploading image to R2...");

            const buffer = Buffer.from(await file.arrayBuffer());
            // console.log(`[DEBUG] Buffer: ${buffer}`)

            const filename = `uploads/${file.name}`
            const url = await uploadOnR2(buffer, filename, file.type)
            // console.log("Image uploaded to R2 with URL: ", url);

            return NextResponse.json({ message: "Image uploaded successfully", data: { url } }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Image upload failed", error }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Image is not provided" }, { status: 400 });
    }
};
