import { deleteFromR2 } from "@/lib/r2";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { key } = body;

        if (!key) {
            return NextResponse.json(
                { message: "Image key is required" },
                { status: 400 }
            );
        }

        console.log(`[DEBUG] Deleting image with key: ${key}`);

        await deleteFromR2(key);

        return NextResponse.json(
            { message: "Image deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(`[ERROR] Failed to delete image:`, error);
        return NextResponse.json(
            { message: "Image deletion failed", error },
            { status: 500 }
        );
    }
};
