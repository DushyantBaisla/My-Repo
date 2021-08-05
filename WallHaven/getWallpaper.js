let puppeteer = require('puppeteer');
let fs = require("fs")
let path = require("path")

let linksarr = [];

(async () => {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://wallhaven.cc/toplist");
        await newPage.waitForNavigation()

        //--------------------- Go to bottom of page and store all the links of images -------------------------//

        let num = 0;
        let val = 0;
        let arrBeforeSanity = []
        let arrAfterSanity = []

        while (num != 108) {

            // // Sanity Check
            let exists = await newPage.evaluate(function () {
                let check = document.querySelector(".listing-notices .button");
                return check ? true : false;
            })
            if (exists) {
                console.log("sanity check");               
                arrBeforeSanity = await newPage.evaluate(function () {
                    let arr = document.querySelectorAll(".thumb-listing-page li a")
                    let links = [];
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].getAttribute("href") != null) {
                            links.push(arr[i].getAttribute("href"));
                        }
                    }
                    return links;
                });
                await newPage.waitForTimeout(2000)
                await newPage.click(".listing-notices .button");
                val = 99;
                await newPage.waitForTimeout(8000);
            }

            // // Scroll
            await newPage.evaluate(function () {
                function randomInt(min, max) { // min and max included 
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                let x = randomInt(100, 350);
                window.scrollBy(0, x)
            })
            function randomInt(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            let y = randomInt(600, 1000);
            await newPage.waitForTimeout(y)
            let num1 = await newPage.evaluate(function () {
                let count = document.querySelectorAll(".thumb-listing-page-num");
                return count.length;
            })                       
            num = num1 + val;
            console.log(num);
        }

        arrAfterSanity = await newPage.evaluate(function () {
            let arr = document.querySelectorAll(".thumb-listing-page li a")
            let links = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].getAttribute("href") != null) {
                    links.push(arr[i].getAttribute("href"));
                }
            }
            return links;
        });

        linksarr = arrBeforeSanity.concat(arrAfterSanity);

        console.log(linksarr.length);
        // // Create a file containing all the links
        let pathName = path.join(__dirname, "links.JSON");
        let createFile = fs.createWriteStream(pathName);
        createFile.end();
        fs.writeFileSync(pathName, JSON.stringify(linksarr));
    }
    catch (err) {
        console.log(err);
    }
})();
