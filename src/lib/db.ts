import mongoose, { Connection } from "mongoose"

let cachedConnection: Connection | null = null;


export async function connectToDB() {
    if (cachedConnection) {
        console.log(`[DEBUG] DB is already connected...`)
        return cachedConnection;
    }

    try {
        const cnx = await mongoose.connect(process.env.DB_URI!);
        cachedConnection = cnx.connection;
        console.log(`[DEBUG] MongoDB database has been connected successfully`)
        return cachedConnection;
    } catch (error) {
        console.log(`[ERROR] Occurred while database connection: ${error}`)
        throw error
    }
}

export {cachedConnection}