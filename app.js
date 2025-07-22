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


//setup route for each collection, get and post methods
async function setupRoutes() {
  await mongoose.connection.asPromise(); // Ensures DB is connected

  let collections = await mongoose.connection.db.listCollections().toArray();
  let collectionNames = collections.map(col => col.name);

    collectionNames.forEach( async (routeName, index)=> {
    const ListModel = mongoose.model(routeName, todoSchema);
    app.get(`/${routeName}`, async function(req, res) {
      try {
        const list = await ListModel.find({}, { _id: 0, item: 1 });
        res.render("index", { date: today,  collectionNames: collectionNames, collection: routeName, list: list});
      } catch (err) {
        res.status(500).send("Error loading list: " + err.message);
      }
    });

  app.post(`/${routeName}`, async function(req, res){
      try{
        if (req.body.button === 'delete'){
            await mongoose.connection.db.dropCollection(routeName);
            collections = await mongoose.connection.db.listCollections().toArray();
            collectionNames = collections.map(col => col.name);
            res.redirect("/");
         } else if (req.body.button === 'empty'){
           await ListModel.deleteMany({});
        res.redirect(`/${routeName}`);

         } else {
          (req.body.input) ? await ListModel.insertOne({item: req.body.input}) : "";
        res.redirect(`/${routeName}`);

         }

      } catch(err){
        res.status(500).send("Error while post request: " + err.message);
      }
  });
});

//home route
app.get("/", (req, res)=>{
        res.render("header", { date: today,  collectionNames: collectionNames});
});

//create list route
app.post("/createList", async (req, res) => {
    const listName = req.body.newList;
    try {
      await mongoose.connection.db.createCollection(listName);
      console.log('Collection created!');
    } catch (err) {
      console.error('Error creating collection:', err);
    } finally {
      await setupRoutes();
      res.redirect(`/${listName}`);
  }
});

}





//Server setup
setupRoutes().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
