import dbconnection from "@/lib/dbconn";
import Birthday from "@/models/Birthday";
import Cors from 'cors'
dbconnection();

const cors = Cors({
    methods: ['GET', 'POST'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async (req, res) => {
    await runMiddleware(req, res, cors)
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
