let puppeteer = require('puppeteer');

let linksarr = [];

(async () => {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://wallhaven.cc/toplist?page=2");

        //------------ Go to bottom of page and store all the links of images -------------------------

        let lastHeight = await newPage.evaluate('document.body.scrollHeight');

        while (true) {
            await newPage.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await newPage.waitForTimeout(1500); // sleep a bit
            let newHeight = await newPage.evaluate('document.body.scrollHeight');
            if (newHeight === lastHeight) {
                console.log("End");
                linksarr = await newPage.evaluate(function () {
                    let arr = document.querySelectorAll(".thumb-listing-page li a")
                    let links = [];
                    for (let i = 0; i < arr.length; i++) {
                        links.push(arr[0].getAttribute("href"));
                    }
                    return links;
                });
                console.log(linksarr.length);
                break;
            }
            lastHeight = newHeight;
        }
        //------- Loop Ends --------------------------//
    }
    catch (err) {
        console.log(err);
    }
})();


