//Without MongoDB connection

const express = require('express');
const fs = require('fs');
const app = express();
const users = require("./MOCK_DATA.json")
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

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
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
})
app.post("/api/users",(req,res)=>{
    // TODO: Create new user
    const body = req.body;
    const newUser = {...body,id: users.length+1};
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        if(err){
            return res.status(500).json({ status: "Error", message: "Failed to save user data." });
        }
        else
        return res.json({status:"Success",id: users.length})
    })    
})
app.patch("/api/users/:id",(req,res)=>{
    // TODO: Edit the user with id
    const userId = parseInt(req.params.id); // Get user ID from URL
    const updates = req.body; // Get update data from request body
    // Find user by ID
    let user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ status: "Error", message: "User not found" });
    }
    // Update user properties dynamically
    Object.assign(user, updates);

    // Save updated data back to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: "Failed to update user" });
        }
        res.json({ status: "Success", user });
    });
})
app.delete("/api/users/:id",(req,res)=>{
    // TODO: delete the user with id
    const userId = parseInt(req.params.id);
    // Check if user exists
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ status: "Error", message: "User not found" });
    }
    // Remove user from the list
    users.splice(userIndex, 1);
  // Save updated list back to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: "Failed to delete user" });
        }
        res.json({ status: "Success", message: "User deleted" });
    });
})

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));
