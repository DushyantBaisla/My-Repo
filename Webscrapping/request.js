// //it is done to use 'we' as call back function

let request = require("request");//request is a dependencies. 'we' requires 'request' dependencies

console.log("Before");

//this is call back function



request("https://www.google.com", cb);//syntax

function cb(error, response, html){
    if(error){
        console.log(error);
    }else{
        console.log(html);
    }    
}

console.log("after");

