let iconContainer = document.querySelector(".icon-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleActive);
firstSheet.click();
iconContainer.addEventListener("click", function () {
    let newSheet = document.createElement("div");
    newSheet.classList.add("sheet");
    let allSheets = document.querySelectorAll(".sheet");
    newSheet.innerText = `sheet-${allSheets.length + 1}`;
    newSheet.setAttribute("idx", allSheets.length)
    sheetList.append(newSheet);
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    newSheet.classList.add("active");
    newSheet.addEventListener("click", handleActive)
    newSheet.click();
   
})

function handleActive(e) {
    let currSheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    currSheet.classList.add("active");
    //
    let idx = currSheet.getAttribute("idx");
    console.log(idx, sheetListArr.length);
    if (idx == 0 && sheetList.length == 0) {
        initSheetDB();
        sheetArr = sheetListArr[0];
    } else {
        if (sheetListArr[idx] == undefined) {
            initSheetDB();
            sheetArr = sheetListArr[idx];
        } else {
            sheetArr = sheetListArr[idx];
        }
        setUI();
    }
    
}
function setUI() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            let cellElem = document.querySelector(`.cell[rid="${i + 1}"][cid="${j + 1}"]`);
            let cellObj = sheetArr[i][j];
            cellElem.innerText = cellObj.value;
        }
    }
}