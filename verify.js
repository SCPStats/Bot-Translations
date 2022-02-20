/*
This file is used by the Github Workflow to verify that the translations contain all needed items and are formatted correctly.
*/

const fs = require("fs");

const keys = fs.readFileSync("translations/en.lang", "utf-8").split(/\r?\n/).map(line => line.split("=")[0]);

const spaceEnds = [
  "need_permission_message_start",
  "usage_message",
  "stats_message",
  "invite_msg",
  "warnings_footer",
  "stafftime_lines_total",
  "stafftime_lines_24h",
  "stafftime_lines_7days",
  "stafftime_lines_30days"
];

const spaceStarts = [
  "need_permission_message_end",
  "leaderboard_place"
];

const endSpace = /\s$/;
const startSpace = /^\s/;

let error = false;

fs.readdirSync("translations/").forEach(file => {
        const lang = fs.readFileSync("translations/"+file, "utf-8");
        const langName = file.split(".")[0];

        console.log("Loading "+langName);

        let translation = [];

        const langs = lang.split(/\r?\n/);

        for (let i = 0; i < langs.length; i++){
            let val = langs[i];
            let vals1 = val.split("=");

            if(vals1.length < 2 || vals1[0].includes(" ")){
                if(val !== "") console.warn("Error with invalid line: \""+val+"\" (line "+(i+1)+")!");
                continue;
            }

            const vals = [vals1[0], vals1.slice(1).join("=")];

            const key = vals[0].trim().toLowerCase();
            if(vals[0] !== key){
                console.warn("Key name not well formatted for \""+key+"\" (line "+(i+1)+")!");
            }

            if(spaceEnds.includes(key) && !endSpace.test(vals[1])) {
                console.warn("Value for key \""+key+"\" (line "+(i+1)+") does not end with a space. There may be a valid reason for this in some languages, but most of the time it should end with one, so please double check it!");
            }

            if(spaceStarts.includes(key) && !startSpace.test(vals[1])) {
                console.warn("Value for key \""+key+"\" (line "+(i+1)+") does not start with a space. There may be a valid reason for this in some languages, but most of the time it should start with one, so please double check it!");
            }

            if(translation.includes(key)) {
                console.warn("Duplicate key \""+key+"\" (line "+(i+1)+")!");
            }

            translation.push(key);
        }

        let localError = false;

        keys.filter(key => !translation.includes(key)).forEach(key => {
            error = true;
            localError = true;

            console.error("Translation missing key \""+key+"\"!");
        });

        if(!localError){
            console.log("Translation Ok!");
        } else {
            console.error("There was an error in the translation. Please fix these issues.");
        }
});

if(error){
    throw new Error("There was one or more errors in the translation files. Please review the log for further details.");
}
