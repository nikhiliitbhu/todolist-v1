const express = require('express');
const bodyParser = require('body-parser');
const today = require(__dirname + "/date.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.listen(port, function(){
    console.log("app is up at " + port);
})

const materialList = [];
const spiritualList = [];

app.get("/", function(req, res){


    res.render("index", {date: today, listType: "material", list : materialList });
})

app.post("/submit", function(req, res){

    let item = req.body.input;
    // console.log(req.body);

    if(req.body.button === 'material'){
      if(item)materialList.push(item || null);
        res.redirect("/");

    } else if(req.body.button === 'spiritual'){
      if(item)spiritualList.push(item || null);
        res.redirect("/spiritual");
    } else {
        if(req.body.clear === 'material'){
            materialList.length = 0;
            res.redirect('/');
        } else if(req.body.clear === 'spiritual'){
            spiritualList.length = 0;
            res.redirect('/spiritual');
        }
    }

})

app.get("/spiritual", function(req, res){
    res.render("index", {date: today, listType: "spiritual", list : spiritualList });

})
