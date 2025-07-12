const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.listen(port, function(){
    console.log("app is up at " + port);
})


const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];

const month = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let todoList = [];
let workList = [];

app.get("/", function(req, res){
    let date = new Date();

    let shortDate = date.getDate() + " " + month[date.getMonth()] + " " +  date.getFullYear();
    let day = date.getDay();


    res.render("index", {date: shortDate, day: dayOfWeek[day], listType: "todo", todoList : todoList });
})

app.post("/submit", function(req, res){

    let item = req.body.todo;
    
    if(req.body.button === 'todo'){
      if(item)todoList.push(item || null);
        res.redirect("/");

    } else if(req.body.button === 'work'){
      if(item)workList.push(item || null);
        res.redirect("/work");
    } else {
        if(req.body.clear === 'todo'){
            todoList = [];
            res.redirect('/');
        } else if(req.body.clear === 'work'){
            workList = [];
            res.redirect('/work');
        }
    }

})

app.get("/work", function(req, res){
    res.render("index", {date: null, day: null, listType: "work", todoList : workList });

})
