const express = require('express')
const app = express()

app.use(express.json())

app.post('/user', function(req, res){
    console.log(req.body);
    res.send("posted")
})

app.listen(9000, function(){
    console.log('server started');
})