import mongoose from "mongoose";
const connection = {};

async function dbconnection() {
    if (connection.isconnected) {
        return
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
    connection.isconnected = db.connections[0].readyState;
}

export default dbconnection;
