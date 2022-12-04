const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
    id: String,
    content: String,
    cover: String,
    owner: String,
});

let Diary;

if (!mongoose.models.Diary) {
    Diary = mongoose.model("Diary", diarySchema, "diaries");
}

export default Diary || mongoose.models.Diary;
