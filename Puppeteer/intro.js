let puppeteer = require("puppeteer");
//browser instance
let browser = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})
let page;
//new page in browser
browser.then(function(browserInstance){
    let newPage = browserInstance.newPage();

    //new tab in browser with the given
    newPage.then(function(newTab){
        let tab = newTab.goto("https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
        page =newTab;
        return tab;
    })
    .then(function(){
        let emailClickPromise = page.click(".Xb9hP");
        return emailClickPromise;
    })
    .then(function(){
        let emailPromise = page.type(".Xb9hP", "1234", {delay:100});
        return emailPromise;
    })
    .then(function(){
        let pressEnter = page.keyboard.press("Enter");
    })
})