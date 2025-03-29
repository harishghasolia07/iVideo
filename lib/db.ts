import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URL!

if (!MONGODB_URI) {
    throw new Error("Please define mongodb URI in env file")
}

let cached = global.mongoose; //If cached already exist

//And if not exist-->
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    //case 1. If we already have conn in cached then return conn
    if (cached.conn) {
        return cached.conn
    }
    //case 2. If we do not have any conn/promise then create promise
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10  //It is the num of conn we can made with mongoDB server at one time
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection)
    }
    //case 3. If there is already a promise exist then wait for some time
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error;
    }

    return cached.conn;
}



































// Username
// harishghasolia
// Password
// 3thkJQDVDLEKB86d

// loyiya2273@dwriters.com


// harishghasolia
// 2FtmP4qBJw9v9LYn

// thisisharish07
// gD9wzyAMV2UrEONu