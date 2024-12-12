// app.js

const express = require('express')
const bodyParser = require('body-parser')
const users = [{
    userName: "Aditya Gupta",
    userEmail: "aditya@gmail.com",
    userAge: "22",
    userUniqueId: '1'
},
{
    userName: "Vanshita Jaiswal",
    userEmail: "vanshita@gmail.com",
    userAge: "21",
    userUniqueId: '2'
},
{
    userName: "Sachin Yadav",
    userEmail: "sachin@gmail.com",
    userAge: "22",
    userUniqueId: '3'
}
]

const app = express()

app.use(express.static('views'));

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.render("home1", {
        data: users
    })
})

app.listen(3100, (req, res) => {
    console.log("App is running on port 3100")
})