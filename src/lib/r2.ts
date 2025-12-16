import { r2Client } from "@/config/r2"
import { R2_BUCKET, R2_PUBLIC_URL } from "@/config/secrets"
import { PutObjectCommand } from "@aws-sdk/client-s3"


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


export {
    uploadOnR2
}