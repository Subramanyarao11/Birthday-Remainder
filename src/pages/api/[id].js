import dbconnection from "@/lib/dbconn";
import Birthday from "@/models/Birthday";
import birthday from "./birthday";
dbconnection();

export default async (req, res) => {

    const { method } = req;
    const { id } = req.query;
    switch (method) {
        case "PUT":
            try {
                const { name, date } = req.body;
                if ((!name, !date)) throw "invalid data";
                await Birthday.updateOne({ _id: id }, { name, date });
                res.status(200).json({ sucess: true });
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    sucess: false,
                    error
                })
            }
            break;

        case "DELETE":
            try {
                await Birthday.deleteOne({
                    _id: id
                })
                res.status(200).json({ sucess: true });
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
