// import Diary from "../../models/Diary";
import {tokenVerificationMiddleware} from "../utils/APIControls";

require("../../models/Diary");
const mongoose = require("mongoose");

// FIX Erreur Cannot overwrite diary : import de Diary comme ci dessous
const Diary = mongoose.model("Diary");


export default async function handler(req, res, next) {
    // tokenVerificationMiddleware(req,res,next)
    if (req && req.method === "GET") {
        return getDiaries(req,res,next)

    } else if (req && req.method === 'PUT') {
        return putDiary(req, res, next)

    } else {
        // Handle any other HTTP method
        res.status(400).send("nope");
    }
}

async function getDiaries(req, res, next) {
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
}

async function putDiary(req,res,next) {
    if (!(req && req.body && req.body.diaryId && req.body.diaryContent)) {
        res.status(400).send("Bad request : need diaryId (string), diaryContent (string)");
    }
    // const targetJournal = await Diary.findOne({_id: req.body.diaryId})
    // targetJournal._doc.content = req.body.diaryContent

    let diary = await Diary.findOneAndUpdate({_id: req.body.diaryId},{content: req.body.diaryContent})
    console.log(diary)
    // targetJournal.save()
    //     .then((response) => {
    //         res.status(200).json()
    //     })
    //     .catch((err) => {
    //         res.status(500).json({error: "Error when saving diary.", details: JSON.stringify(err)})
    //     })
}