const JWT_SIGN = process.env.JWT_SIGN!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY!;
const R2_SECRET_KEY = process.env.R2_SECRET_KEY!;
const R2_BUCKET = process.env.R2_BUCKET!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;


const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`


export { JWT_SIGN, R2_ACCESS_KEY, R2_SECRET_KEY, R2_ENDPOINT, R2_ACCOUNT_ID, R2_BUCKET, R2_PUBLIC_URL };