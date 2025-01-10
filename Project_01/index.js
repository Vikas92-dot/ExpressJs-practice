const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log('MongoDb connected'))
.catch((err)=> console.log("Mongo error", err));
//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},
{timestamps: true});

const User = mongoose.model("user", userSchema);

//Routes
app.get("/users",async (req,res)=>{
    const allDbUser = await User.find({});
    const html = `<ul>
        ${allDbUser.map((user) =>`<li>${user.firstName}- ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
})

// Rest Api
app.get("/api/users",async (req,res)=>{
    const allDbUser = await User.find({});
    return res.json(allDbUser);
})
app.get("/api/users/:id", async (req,res)=>{
    const user = await User.findById(req.params.id);
     return res.json(user);
})
app.post("/api/users", async (req,res)=>{
    // TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        res.status(400).json({message: "All fields are reuired."})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("result", result);
    
    return res.status(201).json({msg: "Success"})
        
})
app.patch("/api/users/:id",async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});
    return res.json({status: "success"})
    })
app.delete("/api/users/:id", async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
})

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));