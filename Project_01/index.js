const express = require('express');
const userRouter = require('./routes/user');
const app = express();
const PORT = 8000;
const {connectMongoDb}= require('./Connection');
const {logReqRes} = require('./middlewares/index');

//Middleware
app.use(express.urlencoded({extended: false}));

app.use(logReqRes('log.txt'));

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(() =>{
    console.log("MongoDb Connected.");
});
//Routes
app.use('/api/users', userRouter);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));