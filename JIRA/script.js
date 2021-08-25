let add_btn = document.querySelector(".add")
add_btn.addEventListener("click", createModal);

function createModal(){
    let modal = document.createElement("div");
    modal.classList.add("container");

    modal.innerHTML = `
    <div class = "input" contenteditable ="true"> </div>
        <div class="color-select">
            <div class="p1 c1" style ="background-color:red;"></div>
            <div class="p2 c1" style ="background-color:green;"></div>
            <div class="p3 c1" style ="background-color:blue"></div>
            <div class="p4 c1" style ="background-color:yellow;"></div>
        </div>
    
    `
    let body = document.querySelector("body");
    body.append(modal);

}