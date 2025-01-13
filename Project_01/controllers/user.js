const User = require('../models/user');

async function handleGetAllUsers(req,res) {
    const allDbUser = await User.find({});
    return res.json(allDbUser);
}
async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
     return res.json(user);
}
async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});
    return res.json({status: "success"})
}
async function handleAddNewUser(req, res) {
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
}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleAddNewUser,
    handleDeleteUserById,
}