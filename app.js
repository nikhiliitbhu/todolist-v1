const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const today = require(__dirname + "/date.js");

//Middleware and port
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

//Mongoose connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected!");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

//mongoose db schema definition
const todoSchema = new mongoose.Schema({
    item: String
});

const list = mongoose.model('list1', todoSchema);


//Server setup
app.listen(port, function(){
    console.log("app is up at " + port);
})

// console.log(materialList);
const spiritualList = [];

app.get("/", async function(req, res){
    const materialList = await list.find({},{_id: 0, item: 1});
    console.log(typeof materialList.item);
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

