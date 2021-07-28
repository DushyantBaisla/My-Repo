let tasks = [
    {
        name: 'aman',
        age: 10
    },
    {
        name: 'zar',
        age: 20
    },
    {
        name: 'ghar',
        age: 50
    },
    {
        name: 'yar',
        age: 15
    }
]
let arr = [ 5,10,20,15,50,30]
arr.sort(function(a,b){
    return a-b;
});
// console.log(arr);

tasks.sort(function(a,b){
    // console.log(a,b);
    return a.age - b.age;
})
console.log(tasks);