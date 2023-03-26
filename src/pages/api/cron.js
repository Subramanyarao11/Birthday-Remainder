import dbconnection from "@/lib/dbconn";
import Birthday from "@/models/Birthday";
import twilio from 'twilio';

dbconnection();

export default async function handler(req, res) {
    try {
        const today = new Date();
        const query = Birthday.find({ date: today }).select('name date -_id').lean().limit(5);
        const birthdays = await query.exec();
        if (birthdays.length === 0) {
            console.log(`No birthdays on ${today}`);
            res.send({ message: "No Birthdays Today" })
            return;
        }
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const messages = await Promise.all(birthdays.map(async (birthday) => {
            return client.messages.create({
                messagingServiceSid: 'MG19c8d8f851ee2e2525446fc35d1667ab',
                body: `Subramanya, Today is ${birthday.name}'s Birthday!. Don't Forget to wish🎉`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '8310251513',
            });
        }));
        messages.forEach((message, index) => {
            console.log(`Sent message to ${birthdays[index].name} at ${birthdays[index].date}: ${message.sid}`);
        });
        res.send({ message: "All message sent successfully." })
    } catch (error) {
        console.error(error);
    }
}
