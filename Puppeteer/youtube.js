let puppeteer = require("puppeteer");
let fs = require("fs");

(async function (){
    try{
    let browserInstance = await puppeteer.launch({
        headless :false,
        defaultViewport :null,
        args :["--start-maximized"]
    })
    let newPage = await browserInstance.newPage();
    await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
    }
    catch(err){
        console.log(err);
    }
})();
