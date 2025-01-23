const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Admin routes
app.get('/admin/home', (req, res) => {
    res.render('admin.home.ejs');
  });
app.get('/admin/about', (req, res) => {
    res.render('admin.about.ejs');
  });

app.get('/admin/contact', (req, res) => {
    res.render('admin.contact.ejs');
});


//User routes
app.get('/user/home',(req,res)=>{
    res.render('user.home.ejs');
})
app.get('/user/about',(req,res)=>{
    res.render('user.about.ejs');
})
app.get('/user/contact',(req,res)=>{
    res.render('user.contact.ejs');
})

app.listen(PORT,() =>{
    console.log("Server started..");
});