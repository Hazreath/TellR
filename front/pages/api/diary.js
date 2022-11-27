// import Diary from "../../models/Diary";
require("../../models/Diary");
const mongoose = require("mongoose");
// FIX Erreur Cannot overwrite diary : import de Diary comme ci dessous
const Diary = mongoose.model("Diary");
export default async function handler(req, res) {
    if (req && req.method === "GET") {
        if (req && req.query && req.query.owner) {
            // Récupère les infos du diary en BD
            mongoose.connect(process.env.DB_URL);
            let diaries = await Diary.find({ owner: req.query.owner });
            // console.log("DIARY", diaries);
            if (!(diaries && diaries.length && diaries.length > 0)) {
                res.status(404).send(
                    "No diaries with owner " + req.query.owner + "."
                );
                return false;
            }
            res.status(200).send(diaries);
        } else {
            res.status(400).send("Missing owner in GET params.");
        }
    } else {
        // Handle any other HTTP method
        res.status(400).send("nope");
    }
}
