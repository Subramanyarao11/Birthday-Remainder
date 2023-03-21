import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("birthdays");
        const { id } = req.query;
        const { name, date } = req.body;

        const birthday = await db.collection("birthdays").updateOne(
            {
                _id: ObjectId(id),
            },
            {
                $set: {
                    name: name,
                    date: date,
                },
            }
        );

        res.json(birthday);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
