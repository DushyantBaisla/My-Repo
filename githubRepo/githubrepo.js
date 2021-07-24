let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfkit = require("pdfkit")

let url = "https://github.com/topics";

request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        githubMain(html);
    }
}

function githubMain(html) {
    let selecTool = cheerio.load(html);

    let names = selecTool(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    let links = selecTool(".col-12.col-sm-6.col-md-4.mb-4 a");

    for (let i = 0; i < names.length; i++) {
        let link = "https://github.com" + selecTool(links[i]).attr("href");
        let name = selecTool(names[i]).text().trim();
        dirCreator(name);
        getRepo(name, link);
    }
}

function getRepo(name, link) {
    request(link, cb1);
    function cb1(err, response, html) {
        if (err) {
            console.log(err)
        } else {
            console.log(name);
            getRepos(html, name);
        }
    }
}

function getRepos(html, topicName) {
    let selectorTool = cheerio.load(html);

    let repos = selectorTool(".f3.color-text-secondary.text-normal.lh-condensed>a");
    for (let i = 0; i < 4; i++) {
        // console.log("Repo:",selectorTool(repos[i]).attr("href"));
        let repoLink = selectorTool(repos[i]).attr("href")
        let fullRepoLink = "https://github.com" + repoLink + "/issues"
        let repoName = selectorTool(repos[i]).attr("href").split("/").pop().trim();
        console.log(repoName)
        getIssues(repoName, topicName, fullRepoLink);
        createFile(repoName, topicName);
    }
    console.log("`````````````````````")
}

function getIssues(repoName, topicName, fullRepoLink) {
    request(fullRepoLink, cb)
    function cb(err, response, html) {
        if (err) {
            console.log(err)
        } else {
            extractIssues(html, repoName, topicName);
        }
    }
}

function extractIssues(link, repoName, topicName){
    let selectorTool = cheerio.load(link);
    let issuesAnchor = selectorTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
    let arr = []
    for(let i=0; i<issuesAnchor.length; i++){
        let link = selectorTool(issuesAnchor[i]).attr("href");
        let issue = selectorTool(issuesAnchor[i]).text();
        arr.push({
            "Name" : issue,
            "Link" : "https://github.com"+link
        })
    }
    let filePath = path.join(__dirname, topicName, repoName+".pdf");
    let pdf = new pdfkit();
    pdf.pipe(fs.createWriteStream(filePath));
    pdf.text(JSON.stringify(arr));
    pdf.end();
}

function dirCreator(topicName) {
    let pathOfFolder = path.join(__dirname, topicName);
    if (fs.existsSync(pathOfFolder) == false) {
        fs.mkdirSync(pathOfFolder);
    }
}

function createFile(repoName, topicName) {
    let pathOfFile = path.join(__dirname, topicName, repoName + ".json");
    if (fs.existsSync(pathOfFile) == false) {
        let createStream = fs.createWriteStream(pathOfFile);
        createStream.end();
    }
}