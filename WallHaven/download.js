let puppeteer = require('puppeteer')
let fs = require('fs')
let path = require('path')

let pathName = path.join(__dirname, "links.JSON")
let linksarr = fs.readFileSync(pathName)
linksarr = JSON.parse(linksarr);


(async () => {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })

        for (let i = 0; i < linksarr.length; i++) {

            let photoPage = await browserInstance.newPage(); // Open new page
            await photoPage.goto(linksarr[i])               // Go to photo link
            await photoPage.waitForTimeout(1500);

            // // Get resolution of photo after link is opened eg : 1920x1080
            let resolution = await photoPage.evaluate(function () {
                let txt = document.querySelector(".showcase-resolution");
                return txt.innerText.toString();
            })
            // [1920, x, 1080]
            let resolutionArr = resolution.split(" ");
            let width = resolutionArr[0]; let height = resolutionArr[2];

            // //Step 1: Click on Crop & Download button
            await photoPage.waitForSelector(".jsAnchor.showcase-crop")
            await photoPage.click(".jsAnchor.showcase-crop")

            // //Step 2: Type custom Width & Height in the box
            await photoPage.waitForSelector("#form-respicker-custom-width")
            await photoPage.waitForTimeout(100)
            await photoPage.type("#form-respicker-custom-width", width, { delay: 100 })
            await photoPage.waitForTimeout(100);
            await photoPage.type("#form-respicker-custom-height", height, { delay: 100 })

            // //Step 3: Click on Done button
            await photoPage.waitForTimeout(300)
            await photoPage.click(".green.button")

            // //Step 4: Click on Continue
            await photoPage.waitForSelector(".green.button.jsAnchor.overlay-submit")
            await photoPage.waitForTimeout(1000)
            await photoPage.click(".green.button.jsAnchor.overlay-submit")

            // //Step 5: Wait for 1 sec, then close the window
            await photoPage.waitForTimeout(7000);
            console.log("current number : ", i + 1);
            await photoPage.close();

        }
    }
    catch (err) {
        console.log(err);
    }
})()

// 750 Downloaded