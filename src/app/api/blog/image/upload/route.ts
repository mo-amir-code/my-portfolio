import { uploadImageOnCloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;

    if (image) {
        try {
            // console.log("Uploading image to Cloudinary...");
            const buffer = Buffer.from(await image.arrayBuffer());
            const { public_id: _public_id, url } = await uploadImageOnCloudinary(buffer)
            // console.log("Image uploaded to Cloudinary with URL: ", url);
            return NextResponse.json({ message: "Image uploaded successfully", data: { url } }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Image upload failed", error }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Image is not provided" }, { status: 400 });
    }
};
