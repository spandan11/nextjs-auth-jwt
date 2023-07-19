import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then(() => {
            console.log('Connected to MongoDB');
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export async function disconnectMongo() {
    if (cached.conn) {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
        cached.conn = null;
    }
}