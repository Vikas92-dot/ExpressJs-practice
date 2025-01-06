const express = require('express');
const app = express();
const users = require("./MOCK_DATA.json")
const PORT = 8000;

//Routes
app.get("/users",(req,res)=>{
    const html = `<ul>
        ${users.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})

// Rest Api
app.get("/api/users",(req,res)=>{
    res.json(users);
})
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
app.post("/api/users",(req,res)=>{
    // TODO: Create new user
    return res.json({status:"pending"})
})
app.patch("/api/users/:id",(res,req)=>{
    // TODO: Edit the user with id
    return res.json({status: "Pending"})
})
app.delete("/api/users/:id",(req,res)=>{
    // TODO: delete the user with id
    return res.json({status: "Pending"})
})

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));
