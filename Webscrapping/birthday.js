let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request")
let cheerio = require("cheerio")

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
    //storing names of teams
    let teamNameArr = selectorTool(".header-title.label");
    let teamName = []
    for(let i=0; i<teamNameArr.length;i++){
        //let teamNameArr1 = selectorTool(teamNameArr[i]).text();
        //teamNameArr1 = teamNameArr1.split("INNINGS")[0]
        teamName.push(selectorTool(teamNameArr[i]).text().split("INNINGS")[0]);
    }
    //to get link and name
    let batsmanTable = selectorTool(".table.batsman")
    for(let i=0;i<batsmanTable.length;i++){
        let playerNameAndLink = selectorTool(batsmanTable[i]).find(".batsman-cell.text-truncate a")        
        for(let j=0;j<playerNameAndLink.length;j++){
            let link = selectorTool(playerNameAndLink[j]).attr("href");//link
            let name = selectorTool(playerNameAndLink[j]).text();//player name

            getBirthday(link, name, teamName[i]);
        }        
    }
}

function getBirthday(link, name, teamName){
    request(link, cb)
    function cb(error, response, html){
        if(error){
            console.log(error)
        }else{
            printBirthday(html, name, teamName)
        }
    }
}
function printBirthday(link, name, teamName){
    let selectorTool = cheerio.load(link)
    let birthdayInfo = selectorTool(".ciPlayerinformationtxt span")
    let birthday = selectorTool(birthdayInfo[1]).text();
    birthday = birthday.split(",")[0];
    console.log("name: ",name,"team name: ", teamName,"birthday: ", birthday)
}
