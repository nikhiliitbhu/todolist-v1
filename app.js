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

let materialList = [];
let spiritualList = [];

app.get("/", function(req, res){
    let date = new Date();

    let shortDate = date.getDate() + " " + month[date.getMonth()] + " " +  date.getFullYear();
    let day = date.getDay();


    res.render("index", {date: shortDate, day: dayOfWeek[day], listType: "material", list : materialList });
})

app.post("/submit", function(req, res){

    let item = req.body.input;
    console.log(req.body);

    if(req.body.button === 'material'){
      if(item)materialList.push(item || null);
        res.redirect("/");

    } else if(req.body.button === 'spiritual'){
      if(item)spiritualList.push(item || null);
        res.redirect("/spiritual");
    } else {
        if(req.body.clear === 'material'){
            materialList = [];
            res.redirect('/');
        } else if(req.body.clear === 'spiritual'){
            spiritualList = [];
            res.redirect('/spiritual');
        }
    }

})

app.get("/spiritual", function(req, res){
    res.render("index", {date: null, day: null, listType: "spiritual", list : spiritualList });

})
