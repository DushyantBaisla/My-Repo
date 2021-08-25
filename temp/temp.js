// arguments
// function f(){
//     let sum = 1;

//     for(let x in arguments){        
//         x != 0 ? sum*= arguments[x] : sum *= 1;
//     }
//     return sum;
// }
// console.log(f(1,2,3));

//----------- Strings
/* 
    Strings are immutable and all string functions will return a new string without changing the origional string

    #1 str.replace(replace what, replace with)
    #2 str.slice(idx) || str.slice(start, end)
    #3 str.toUpperCase() => changes to upper case letters
    #4 str.trim() => removes unwanted spaces in string
    #5 str.split(splitting parameter) => splits array according to parameter and returns it in an array
*/
// Memory : a => 10
/*

[ 
  { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] }, 
  { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] }, 
]

*/
function fn(x=10, y){
  return x*2
};
console.log(fn());


function randomAdder(arr = ["a ", "b"]) {
  arr[arr.length * arr.length] = arr.length * arr.length;
};