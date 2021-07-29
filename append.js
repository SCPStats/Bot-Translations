//Because doing this by hand is hell
//Appends a new translation after a specific key
//Usage: node append.js after_name new_name new_value

const fs = require("fs");

fs.readdirSync("translations/").forEach(file => {
    const lang = fs.readFileSync("translations/"+file, "utf-8");
    const langName = file.split(".")[0];
        
    console.log("Loading "+langName);

    let translation = [];
  
    const langs = lang.split(/\r?\n/);
	
	const entries = [];
	
	langs.filter(Boolean).forEach(lang => {
		const split = lang.split("=");
		
		const name = split.shift();
		
		entries.push([name, split.join("=")]);

		if(name === process.argv[2]) entries.push([process.argv[3], process.argv[4]]);
	});
	
	fs.writeFileSync("translations/"+file, entries.map(entry => entry.join("=")).join("\n"));
});