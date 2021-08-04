var a = 10;

function fn(){
    var a = 20;
    a++
    console.log('5', a);
    if(true){
        var a = 30;
        console.log('8', a);
    }
    console.log('10', a);
}
console.log('12', a);
fn();
console.log("14", a);