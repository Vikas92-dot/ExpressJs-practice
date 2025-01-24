const express = require('express');
const app = express();
const port = 3000;

const AdminRouter = express.Router();
const FacultyRouter = express.Router();
const StudentRouter = express.Router();

const data = 
[
 {id: 1, sname:"vinod" , age : 20, stream :"cs" , sem: "VI", coding_level : "intermediatary"}, 
 {id: 2, sname:"Akshay" , age : 20, stream :"cs" , sem: "VI", coding_level : "Beginner"},
 {id: 3, sname:"Rithvik" , age : 20, stream :"IT" , sem: "VI", coding_level : "Expert"}
] 

//middleware
app.use(express.json());

const loggedData = function(req,res,next){
    console.log(req.method,req.url,"Date: ",new Date().toISOString());
    next();
}
//Admin Route
AdminRouter.use(loggedData);
AdminRouter.route('/admin')
    .get((req,res)=>{
        res.json(data);
    })
    .post((req,res)=>{
    const {sname,age,stream,sem,coding_level} = req.body;
        let newData = {
            id: data.length+1,
            sname: sname,
            age: age,
            stream: stream,
            sem: sem,
            coding_level: coding_level
        }
        data.push(newData);
        res.status(201).json({
            'message': "successfully created"
        });
    });
    //updateAll
    AdminRouter.route('/admin/:id')
        .put((req,res)=>{
        const userId = parseInt(req.params.id);
        const {sname,age,stream,sem,coding_level} = req.body;
        const index = data.findIndex(item => item.userId === data.id);

        if(index !== -1){
             data[userId-1] = {
                id: userId,
                sname: sname || '',
                age: age || '',
                stream: stream || '',
                sem: sem || '',
                coding_level: coding_level || ''
            }
            res.json(data[userId-1])
            res.status(201).json({message: "Successfully update all data."})
        }
    })
    .patch((req,res)=>{
        const userId = parseInt(req.params.id);
        const {sname,age,stream,sem,coding_level} = req.body;
        const index = data.findIndex(item => item.userId === data.id);
        if(index !== -1){
             data[userId-1]={
                id: userId,
                sname: sname || data[userId-1].sname,
                age: age || data[userId-1].age,
                stream: stream || data[userId-1].stream,
                sem: sem || data[userId-1].sem,
                coding_level: coding_level || data[userId-1].coding_level
             }
        }
        res.json(data[userId-1]);
        res.status(201).json({message: "Successfully updated data."})
    })
    .delete((req,res)=>{        
        const userId = parseInt(req.params.id);
        const index = data.findIndex(item => item.userId === data.id);
        if(index !== -1){
            data.splice(index, 1);
                    
            res.status(201).json({message: `${userId} User delete successfully`})
        }
        else {
            // Respond with not found
            res.status(404).json({
                message: `Item with ID ${idToDelete} not found`,
            });
        }
    })
    .get((req,res)=>{
        let found = data.find(function (item) {
            return item.id === parseInt(req.params.id);
        });
        if (found) {
            res.status(200).json(found);
        } else {
            res.sendStatus(404);
        }
    })

//Faculty Route
FacultyRouter.use(loggedData);
FacultyRouter.route('/faculty')
    .get((req,res)=>{
        res.json(data);
    })
    .post((req,res)=>{
    const {sname,age,stream,sem,coding_level} = req.body;
        let newData = {
            id: data.length+1,
            sname: sname,
            age: age,
            stream: stream,
            sem: sem,
            coding_level: coding_level
        }
        data.push(newData);
        res.status(201).json({
            'message': "successfully created"
        });
    });
    //updateAll
    FacultyRouter.route('/faculty/:id')
        .put((req,res)=>{
        const userId = parseInt(req.params.id);
        const {sname,age,stream,sem,coding_level} = req.body;
        const index = data.findIndex(item => item.userId === data.id);

        if(index !== -1){
             data[userId-1] = {
                id: userId,
                sname: sname || '',
                age: age || '',
                stream: stream || '',
                sem: sem || '',
                coding_level: coding_level || ''
            }
            res.json(data[userId-1])
            res.status(201).json({message: "Successfully update all data."})
        }
    })
    .patch((req,res)=>{
        const userId = parseInt(req.params.id);
        const {sname,age,stream,sem,coding_level} = req.body;
        const index = data.findIndex(item => item.userId === data.id);
        if(index !== -1){
             data[userId-1]={
                id: userId,
                sname: sname || data[userId-1].sname,
                age: age || data[userId-1].age,
                stream: stream || data[userId-1].stream,
                sem: sem || data[userId-1].sem,
                coding_level: coding_level || data[userId-1].coding_level
             }
        }
        res.json(data[userId-1]);
        res.status(201).json({message: "Successfully updated data."})
    })
    .get((req,res)=>{
        let found = data.find(function (item) {
            return item.id === parseInt(req.params.id);
        });
        if (found) {
            res.status(200).json(found);
        } else {
            res.sendStatus(404);
        }
    })

StudentRouter.use(loggedData);
StudentRouter.route('/student')
    .post((req,res)=>{
    const {sname,age,stream,sem,coding_level} = req.body;
        let newData = {
            id: data.length+1,
            sname: sname,
            age: age,
            stream: stream,
            sem: sem,
            coding_level: coding_level
        }
        data.push(newData);
        res.status(201).json({
            'message': "successfully created"
        });
    });

app.use(AdminRouter);
app.use(FacultyRouter);
app.use(StudentRouter);

app.listen(port,(data,err)=>{
    if(!err){
        console.log(`Server connected successfully at ${port}`);
    }
})