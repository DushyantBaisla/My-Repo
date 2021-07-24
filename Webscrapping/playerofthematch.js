let request = require("request");
let cheerio = require("cheerio");

let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url, cb);

function cb(error, response, html){
    if(error){
        console.log(error)
    }else{
        getMatch(html)
    }
}

function getMatch(html){
    let selectorTool = cheerio.load(html);

    let matchesBlock = selectorTool(".match-info-link-FIXTURES");

    for(let i =0; i<matchesBlock.length; i++){
        let link = selectorTool(matchesBlock[i]).attr("href");
        console.log(html)
        // getPOM(link);
    }
}

// function getPOM(link){
//     request(link, cb1);

//     function cb1(error, response, html){
//         if(error){
//             console.log(error)
//         }else{
//             console.log(html)
//             // POM(html);
//         }
//     }    
// }

// function POM(html){
//     let selectorTool = cheerio.load(html);

//     // let playerOfMatch = selectorTool("best-player-content").text();
//     console.log(html);
// }