const axios = require("axios");
function buildTellRUrl(endpoint) {
    return window.location.protocol + "//" + window.location.host + endpoint;
}

/**
 * Returns diaries who belongs to specified user
 * @param {*} owner user id
 * @returns list of diaries owned by specified user
 */
async function getDiariesForOwner(owner) {
    console.log(owner);
    console.log("URL : ", buildTellRUrl("/api/diary"));
    let res = await axios.get(buildTellRUrl("/api/diary"), {
        params: { owner: owner },
    });

    return res.data;
}

async function putDiary(diaryId, diaryContent) {
    console.log('putDiary : ', diaryId, ' ', diaryContent)

    let data = { diaryId : diaryId, diaryContent: diaryContent}
    let res = axios.put(buildTellRUrl("/api/diary"), data)

    return res.data
}
module.exports = {
    getDiariesForOwner,
    putDiary
};
