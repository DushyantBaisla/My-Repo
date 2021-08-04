let videorecordbtn = document.querySelector("#recordbtn");
let capturebtn = document.querySelector("#capture");
let mediaRecorder;
let recording = false;
let chunks = [];

videorecordbtn.addEventListener("click", function () {
    let rec = document.querySelector(".record");
    if (mediaRecorder != undefined) {
        if (recording == false) {
            recording = true;
            rec.classList.add("rec-anim");
            mediaRecorder.start();
            // videorecordbtn.innerText = "Recording...";
        } else {
            recording = false;
            rec.classList.remove("rec-anim");
            mediaRecorder.stop();
            // videorecordbtn.innerText = "Record";
        } 
    }
})

//media recorder promise
let videoPlayer = document.querySelector("video");
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (mediaStream) {
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    }
    mediaRecorder.onstop = function () {
        let blob = new Blob(chunks, { type: 'video/mp4' });
        chunks = [];
        let blobUrl = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'video.mp4';
        link.click();
        link.remove();
    }
}).catch(function (err) {
    console.log(err);
})

capturebtn.addEventListener("click", function(){
    console.log("clicked")
    let cap = document.querySelector(".photo");
    cap.classList.add("cap-anim");
    capture();
    setTimeout(function(){
        cap.classList.remove("cap-anim");
    }, 500);
})

function capture(){
    //make canvas    
    let c = document.createElement("canvas");
    c.width = videoPlayer.videoWidth;
    c.height = videoPlayer.videoHeight;
   
    //make tool and draw image
    let tool = c.getContext("2d");
    tool.drawImage(videoPlayer, 0, 0);
    //create download link
    let a = document.createElement("a");
    a.href = c.toDataURL();
    a.download = "image.png";
    //download then remove elements
    a.click();
    a.remove();
    c.remove();    
}