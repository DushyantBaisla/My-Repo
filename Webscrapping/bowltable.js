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
function extractElem(html) {
    let selectorTool = cheerio.load(html);
    let bowlerTable = selectorTool(".table.bowler");//array of tables 
    let hwt = 0;
    let hwtname = "";
    
    for (let i = 0; i < bowlerTable.length; i++) {
        let singleInnings = selectorTool(bowlerTable[i]).find("tbody tr");// stored rows

        for (let j = 0; j < singleInnings.length; j++) {
            let singleRow = selectorTool(singleInnings[j]).find("td");//array containing rows

            let name = selectorTool(singleRow[0]).text();//array containing names
            let wicket = selectorTool(singleRow[4]).text();//array containing wickets     
            if(wicket > hwt){
                hwt = wicket;
                hwtname = name;
            }
        }
    }
    console.log("name:- ", hwtname, "wicket:- ",hwt);
}
