//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model("Item", itemSchema);

// Item.deleteMany({},(err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Cleared items collection");
//   }
// })

const item1 = new Item({
  name: "Buy Food!"
})

const item2 = new Item({
  name: "Cook Food"
})

const item3 = new Item({
  name: "Eat Food"
})

const defaultItems = [item1, item2, item3];

// We can make a collection of lists.
// Inside the list collection, there are collections of items.
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else if (items.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added default items");
        }
      })
      res.redirect("/"); // Interesting patten. Update and redirect to same route
    } else {
      const day = date.getDate();
      res.render("list", {listTitle: day, newListItems: items});
    }
  })
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  console.log(req.body);

  const newItem = new Item({
    name: itemName
  })

  if (listName === date.getDate()) {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.items.push(newItem);
        result.save().then(()=>{
          res.redirect("/"+listName);
        });
      }
    })
  }
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.idToDelete;
  const listName = req.body.listName;

  if (listName === date.getDate()) {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Item with ID: ${checkedItemId} removed`)
      }
    })
    res.redirect("/")
  } else {
    List.findOneAndUpdate(
      {name: listName},
      {$pull: {items: {_id: checkedItemId}}},
      (err, results) => {
        if (!err) {
          res.redirect("/"+listName);
        }
      }
    )
  }
});

app.get("/:dynamic", function(req, res) {

  // Use lodash to standardise dynamic titles
  const dynamicTitle = _.capitalize(req.params.dynamic);
  
  List.findOne({name: dynamicTitle}, (err, result) => {
    if (err) {
      console.log(error);
    } else if (result) {
      console.log("List exists");
      res.render("list", {
        listTitle: result.name,
        newListItems: result.items
      })
    } else {
      const list = new List({
        name: dynamicTitle,
        items: defaultItems
      })
      // Getting dupes async :(
      list.save().then( ()=> {
        res.redirect("/" + dynamicTitle)
      });
      console.log(`List doesn't exist. Creating a new list ${dynamicTitle}`);
    }
  })
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
