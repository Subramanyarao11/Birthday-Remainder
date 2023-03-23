import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema({
    name: String,
    // date: String
    date: Date
})

const Birthday = mongoose.models.Birthday || mongoose.model("Birthday", BirthdaySchema);

export default Birthday;
