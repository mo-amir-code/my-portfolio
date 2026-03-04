import { r2Client } from "@/config/r2"
import { R2_BUCKET, R2_PUBLIC_URL } from "@/config/secrets"
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"


const uploadOnR2 = async (filedata: Buffer<ArrayBuffer>, filename: string, filetype: string) => {
    console.log(`[DEBUG] File Name: ${filename}`)
    console.log(`[DEBUG] File Type: ${filetype}`)

    try {

        await r2Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET,
                Key: filename,
                Body: filedata,
                ContentType: filetype
            })
        )

    } catch (error) {
        console.error(`[ERROR] occurred inside on R2: ${error}`)
        throw new Error("Upload fail")

    }

    const finalPublicUrl = `${R2_PUBLIC_URL}/${filename}`

    return finalPublicUrl
}

const deleteFromR2 = async (key: string) => {
    console.log(`[DEBUG] Deleting file from R2: ${key}`)

    try {
        await r2Client.send(
            new DeleteObjectCommand({
                Bucket: R2_BUCKET,
                Key: key,
            })
        )
        console.log(`[DEBUG] File deleted successfully: ${key}`)
    } catch (error) {
        console.error(`[ERROR] occurred while deleting from R2: ${error}`)
        throw new Error("Delete failed")
    }
}

export {
    uploadOnR2,
    deleteFromR2
}