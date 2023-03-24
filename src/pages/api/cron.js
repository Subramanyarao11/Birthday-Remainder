import dbconnection from "@/lib/dbconn";

dbconnection()
export default async function handler(req, res) {
    try {
        const birthdays = await db
            .collection('birthdays')
            .find({ date: new Date() })
            .toArray();
        for (const birthday of birthdays) {
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            const message = await client.messages.create({
                messagingServiceSid: 'MG19c8d8f851ee2e2525446fc35d1667ab',
                body: `Subramanya, Today is ${birthday.name}'s Birthday!. Don't Forget to wish🎉`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '8310251513',
            });
            console.log(`Sent message to Subramanya's Number at ${birthday.date}: ${message.sid}`);
        }
    } catch (error) {
        console.error(err);
    }
}
