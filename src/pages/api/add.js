import clientPromise from "../../lib/mongodb";
export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("birthdays");
        const { name, date } = req.body;

        const birthday = await db.collection("birthdays").insertOne({
            name,
            date,
        });

        res.json(birthday);
        console.log(birthday)
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
