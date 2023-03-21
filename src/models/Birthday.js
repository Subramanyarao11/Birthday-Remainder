import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema({
    name: String,
    date: String
})

const Birthday = mongoose.models.Birthday || mongoose.model("Birthday", BirthdaySchema);

export default Birthday;
