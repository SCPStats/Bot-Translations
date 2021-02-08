/*
This file is used by the Github Workflow to verify that the translations contain all needed items and are formatted correctly.
*/

const fs = require("fs");

const keys = [
  "error_title",
  "error_message",
  "admin_message",
  "usage_message",
  "success_message",
  "needs_link",
  "stats_notpublic",
  "stats_title",
  "stats_message",
  "stats_field_kills",
  "stats_field_deaths",
  "stats_field_kd",
  "stats_field_playtime",
  "stats_field_rounds",
  "stats_field_sodas",
  "stats_field_escapes",
  "stats_footer",
  "help_title",
  "help_cmd_help_cmd",
  "help_cmd_help_desc",
  "help_cmd_stats_cmd",
  "help_cmd_stats_desc",
  "help_cmd_rank_cmd",
  "help_cmd_rank_desc",
  "help_cmd_serverrank_cmd",
  "help_cmd_serverrank_desc",
  "help_cmd_serverstats_cmd",
  "help_cmd_serverstats_desc",
  "help_cmd_leaderboard_cmd",
  "help_cmd_leaderboard_desc",
  "help_cmd_prefix_cmd",
  "help_cmd_prefix_desc",
  "help_cmd_link_cmd",
  "help_cmd_link_desc",
  "help_cmd_unlink_cmd",
  "help_cmd_unlink_desc",
  "help_cmd_invite_cmd",
  "help_cmd_invite_desc",
  "help_cmd_botinfo_cmd",
  "help_cmd_botinfo_desc",
  "help_cmd_lang_cmd",
  "help_cmd_lang_desc",
  "link_alreadylinked",
  "link_linkmessage",
  "unlink_message",
  "unlink_notlinked",
  "prefix_noprefix",
  "prefix_toolong",
  "prefix_message",
  "rank_title",
  "rank_msg1",
  "rank_msg2",
  "leaderboard_title",
  "leaderboard_desc",
  "leaderboard_place",
  "leaderboard_title_kills",
  "leaderboard_title_deaths",
  "leaderboard_title_rounds",
  "leaderboard_title_playtime",
  "leaderboard_title_sodas",
  "leaderboard_title_medkits",
  "leaderboard_title_balls",
  "leaderboard_title_adrenaline",
  "invite_title",
  "invite_msg",
  "botinfo_title",
  "botinfo_desc",
  "botinfo_field_author",
  "botinfo_field_servers",
  "botinfo_field_invite",
  "lang_title",
  "lang_desc",
  "lang_thislang",
  "lang_success",
  "hours",
  "rank_rank",
  "rank_level"
];

const spaceEnds = [
  "usage_message",
  "stats_message",
  "link_linkmessage",
  "rank_msg1",
  "invite_msg"
];

const endSpace = /\s$/;

let error = false;

fs.readdirSync("translations/").forEach(file => {
        const lang = fs.readFileSync("translations/"+file, "utf-8");
        const langName = file.split(".")[0];
        
        console.log("Loading "+langName);

        let translation = [];

        for (let i = 0; i < lang.split(/\r?\n/).length; i++){
            let val = lang.split(/\r?\n/)[i];
            let vals1 = val.split("=");

            if(vals1.length < 2 || vals1[0].includes(" ")){
                console.warn("Error with invalid line: \""+val+"\" (line "+(i+1)+")!");
                continue;
            }

            const vals = [vals1.slice(0, 1)[0], vals1.slice(1).join("=")];

            const key = vals[0].trim().toLowerCase();
            if(vals[0] !== key){
                console.warn("Key name not well formatted for \""+key+"\" (line "+(i+1)+")!");
            }

            if(spaceEnds.includes(key) && !endSpace.test(val)){
                console.warn("Value for key \""+key+"\" (line "+(i+1)+") does not end with a space. There may be a valid reason for this in some languages, but most of the time it should end with one, so please double check it,");
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