import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("birthdays");

        const birthdays = await db.collection("birthdays").find({}).limit(20).toArray();

        res.json(birthdays);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
