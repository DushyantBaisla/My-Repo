let request = require("request")
let cheerio = require("cheerio")
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);

function cb(error, response, html){
    if(error){
        console.log(error)
    }else{
        batsmanName(html)
    }
}

function batsmanName(html){
    let selectorTool = cheerio.load(html)
    let teamNameArr = selectorTool(".header-title.label");//team names
    let teamName = []
    for(let i=0; i<teamNameArr.length;i++){
        //let teamNameArr1 = selectorTool(teamNameArr[i]).text();
        //teamNameArr1 = teamNameArr1.split("INNINGS")[0]
        //teamName.push(teamNameArr1);
        teamName.push(selectorTool(teamNameArr[i]).text().split("INNINGS")[0]);
    }

    let batsmanTable = selectorTool(".table.batsman")

    for(let i=0;i<batsmanTable.length;i++){
        let playerNames = selectorTool(batsmanTable[i]).find(".batsman-cell.text-truncate")
        for(let j=0;j<playerNames.length;j++){
            console.log("Name:-", selectorTool(playerNames[j]).text(), "|| Team:- ", teamName[i])
        }
        console.log("```````````````````````````````````")
    }

}