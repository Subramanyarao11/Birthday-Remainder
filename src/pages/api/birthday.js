import dbconnection from "@/lib/dbconn";
import Birthday from "@/models/Birthday";
dbconnection();

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const birthdays = await Birthday.find({});
                res.status(200).json({ sucess: true, data: birthdays });
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    sucess: false,
                    error
                })
            }
            break;

        case "POST":
            try {
                const { name, date } = req.body;
                if ((!name, !date)) throw "invalid data";
                const birthday = await Birthday.create({ name, date });
                res.status(201).json({ sucess: true, data: birthday });
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    sucess: false,
                    error
                })
            }
            break;

    }
};
