let puppeteer = require("puppeteer");
let page;

let browser = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})

browser.then(function(browserInstance){ // new tab open
    let newTabP = browserInstance.newPage();
    return newTabP;
})
.then(function(newTab){ //new tab link
    let newPage = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    page = newTab;
    return newPage;
})
.then(function(){ //input email
    let emailPromise = page.type("#input-1", "helokar440@astarmax.com", {delay: 100})
    return emailPromise;
})
.then(function(){ //input password
    let passwordPromise = page.type("#input-2", "12345678", {delay: 100});
    return passwordPromise
})
.then(function(){ //click login
    let clickPromise = page.click("button[data-analytics='LoginPassword']")
    //let waitforSelector = page.waitforSelector(".card-content h3[title = 'Interview Preparation Kit']", {visible:true})
    let combinedPromise = Promise.all([clickPromise, page.waitForNavigation({waitUntil: "networkidle0"})]);
    return combinedPromise;
})
.then(function(){ // click interview prepration kit
    let clickPromise = page.click(".card-content h3[title = 'Interview Preparation Kit']");
    let waitforSelectorP = page.waitforSelector("a[data-attr1='warmup']", {visible:true})
    let combinedPromise = Promise.all([clickPromise, page.waitForNavigation({waitUntil: "networkidle0"}), waitforSelectorP])
    return combinedPromise;
})
.then(function(){// click warmup challeneges
    let clickPromise = page.click("a[data-attr1='warmup']")
    let waitforSelectorP = page.waitforSelector("a[data-attr1='sock-merchant']", {visible:true})
    let combinedPromise = Promise.all([clickPromise, page.waitForNavigation({waitUntil: "networkidle0"}), waitforSelectorP])
    return combinedPromise;
})
.then(function(){// click solve challenge
    let clickPromise = page.click("a[data-attr1='sock-merchant']");
    let combinedPromise = Promise.all([clickPromise, page.waitForNavigation({waitUntil: "networkidle0"})])
    return combinedPromise;
})
.catch(function(error){
    console.log(error);
})