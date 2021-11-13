const express = require('express')

const app = express()
app.use(express.json())

app.get("/user", function(req, res){
    res.send("user page")
})


app.post("/user", function(req, res){
    console.log(req.body);
    res.status(200).json(req.body)
})

app.get('/', function(req, res){
    res.send("<h1>Hello from backend</h1>")
})

app.listen(8000, function(){
    console.log('server started');
})
