let topRow = document.querySelector(".top-row")
for (let i = 0; i < 26; i++) {
    let div = document.createElement("div");
    div.innerText = String.fromCharCode(65 + i)
    div.setAttribute("class", "cell");
    topRow.append(div);
}

let leftCol = document.querySelector(".left-col");
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.innerText = i;
    div.setAttribute("class", "block");
    leftCol.append(div);
}
let sheetListArr = [];
let sheetArr;
let grid = document.querySelector(".grid");
let address = document.querySelector(".address");

function initSheetDB(){
    let sheetArr = [];
    for (let i = 1; i <= 100; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        //for array
        let rowArr = [];
        for (let j = 0; j < 26; j++) {
            let div = document.createElement("div");
            div.setAttribute("class", "cell");
            div.setAttribute("rid", i);
            div.setAttribute("cid", j + 1);
            div.setAttribute("contenteditable", "true");
            div.style.fontWeight = "normal";
            let cellObj = {
                value: "",
                formula: "",
                children: []
            }
            //cell event listner         
            div.addEventListener("click", function () {
                let bold = document.querySelector(".bold");
                if (div.style.fontWeight == "normal") {
                    bold.classList.remove("selected");
                } else if (div.style.fontWeight == "bold") {
                    bold.classList.add("selected");
                }
                div.classList.add("a");
                address.innerText = String.fromCharCode(65 + j) + " " + i;
                address.setAttribute("rid", i);
                address.setAttribute("cid", j + 1);
                //cell object
            })
            rowArr.push(cellObj);
            row.appendChild(div);
        }
        grid.appendChild(row);
        sheetArr.push(rowArr );
    }
    sheetListArr.push(sheetArr);
}
