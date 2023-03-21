import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("birthdays");
        const { id } = req.query;

        const birthday = await db.collection("birthdays").deleteOne({
            _id: ObjectId(id),
        });

        res.json(birthday);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
