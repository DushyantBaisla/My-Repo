let formulaContainer = document.querySelector(".formula");
formulaContainer.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaContainer.value != null) {
        let address = document.querySelector(".address");
        let r = address.getAttribute("rid");
        let c = address.getAttribute("cid");
        //evaluate formula 
        let formula = formulaContainer.value;
        if(formula == sheetArr[r-1][c-1].formula){
            return;
        }
        if(formula == ""){
            console.log("removed");
            removeFormula(sheetArr[r-1][c-1].formula, address);
            return;
        }
        let val = evaluate(formula);
        //update cell value
        let cell = document.querySelector(`.grid .cell[rid ="${r}"][cid ="${c}"]`);
        cell.innerText = val;
        updateChildren(sheetArr[r-1][c-1].children); 
        //update in db
        sheetArr[r-1][c-1].formula = formula;
        sheetArr[r-1][c-1].value = val;        
        //attach to parent
        attachToParent(formula, address);
    }
})

function evaluate(formula){
    let formulaTokens = formula.split(" ");
    for(let i =0; i<formulaTokens.length;i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <=90){
            let pc = Number(formulaTokens[i].charCodeAt(0) -64);
            let pr = Number(formulaTokens[i].slice(1));
            //parent cell
            let pCell = document.querySelector(`.grid .cell[rid ="${pr}"][cid ="${pc}"]`);
            formulaTokens[i] = pCell.innerText;  
        }
    }
   return eval(formulaTokens.join(" "));
}
function attachToParent(formula, address){
    let formulaTokens = formula.split(" ");
    for(let i =0; i<formulaTokens.length;i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <=90){
            //parent rid, cid
            let pc = Number(formulaTokens[i].charCodeAt(0) -64);
            let pr = Number(formulaTokens[i].slice(1))  ;
            //child rid, cid
            let cr = address.getAttribute("rid");
            let cc = address.getAttribute("cid");            
            sheetArr[pr-1][pc-1].children.push(cr.toString()+cc.toString());        
        }
    }
}

let cells = document.querySelectorAll(".cell");

for(let i =0; i<cells.length;i++){
    cells[i].addEventListener("blur", function(){
        cells[i].classList.remove("a");
        let rid = cells[i].getAttribute("rid");
        let cid = cells[i].getAttribute("cid");
        let cellObj = sheetArr[rid-1][cid-1];
        console.log(cellObj.value, cells[i].innerText);
        
        cellObj.value = cells[i].innerText;
        console.log(cellObj);
        updateChildren(cellObj.children);
        let address = document.querySelector(".address");
        removeFormula(cellObj.formula, address);
    })
}
function updateChildren(children){
       if(children.length == 0){
        return;
    }
    for(let i =0; i<children.length; i++){
        let child = children[i];
        let r = child.charAt(0);
        let c = child.charAt(1);
        console.log((child.charAt(0)))   
        let formula = sheetArr[r-1][c-1].formula;     
        let val = evaluate(formula);
        let cell = document.querySelector(`.grid .cell[rid ="${r}"][cid ="${c}"]`);
        cell.innerText = val;        
        sheetArr[r-1][c-1].value = val;
        updateChildren(sheetArr[r-1][c-1].children);
    }

}
function removeFormula(formula, address){
    let formulaTokens = formula.split(" ");
    for(let i =0; i<formulaTokens.length;i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <=90){
            //parent rid, cid
            let pc = Number(formulaTokens[i].charCodeAt(0) -64);
            let pr = Number(formulaTokens[i].slice(1))  ;
            //child rid, cid
            let cr = address.getAttribute("rid");
            let cc = address.getAttribute("cid");            
           let idx = sheetArr[pr-1][pc-1].children.indexOf(cr.toString()+cc.toString());        
           sheetArr[pr-1][pc-1].children.splice(idx);
           sheetArr[cr-1][cc-1].formula = "";
        }
    }
}