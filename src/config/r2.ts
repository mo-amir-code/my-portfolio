import { S3Client } from "@aws-sdk/client-s3"
import { R2_ACCESS_KEY, R2_ENDPOINT, R2_SECRET_KEY } from "./secrets"

const r2Client = new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY
    }
})

export { r2Client }