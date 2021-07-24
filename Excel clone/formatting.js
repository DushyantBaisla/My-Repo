
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

bold.addEventListener("click", function(){
    let address = document.querySelector(".address");
    let r = address.getAttribute("rid");
    let c = address.getAttribute("cid");
    let cell = document.querySelector(`.grid .cell[rid ="${r}"][cid ="${c}"]`)
    
    if(bold.classList.contains("selected")){
        cell.style.fontWeight = "normal";
        bold.classList.remove("selected");
    }else{
        if(cell == null){

        }else{
            cell.style.fontWeight = "bold";
        }
        bold.classList.add("selected");
    }
})