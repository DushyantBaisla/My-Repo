let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        extractElem(html);
    }
}

function extractElem(html){
    let selectorTool = cheerio.load(html);

    
    let stats = selectorTool(".table.bowler tbody tr");
    let hwkt = 0;
    let player = ""
    
    for(let i =0; i<stats.length; i++){
        let rowStat = selectorTool(stats[i]).find("td");

        let playerName = selectorTool(rowStat[0]).text();
        let wicket = selectorTool(rowStat[4]).text();
        if(wicket > hwkt){
            hwkt = wicket;
            player = playerName
        }
        
    }
    console.log(player, hwkt)
}