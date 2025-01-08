const express = require('express');
const path = require('path');
const app = express();

app.get('/',(req,res) => {
    res.send("hello its my home page")
})
app.get('/about',(req,res)=>{
    res.send("<h1>hello its my about page</h1>")
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'demo.html'));
})
app.get('/json',(req,res)=>{
    res.sendFile(path.join(__dirname,'demo.json'))
})
var obj = {
    portal: "GeeksforGeeks",
    knowledge: "unlimited",
    location: "Noida"
}
app.get('/object',(req,res)=>{
    res.json(obj)
})
const data = "my own data as i require"
app.get('/data',)
app.listen(3000,(req,res)=>{
    console.log("App is running on port 3000")
})