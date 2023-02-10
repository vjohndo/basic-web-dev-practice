const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Fruit is singular
const Fruit = mongoose.model("Fruit", fruitSchema);

const Cherry = new Fruit ({
    name: "Cherry",
    rating: 0,
    review: "Pretty solid as a fruit"
});

const orange = new Fruit ({
    name: "Orange2",
    rating: 6,
    review: "Pretty solid as a fruit"
});

const banana = new Fruit ({
    name: "Banana2",
    rating: 4,
    review: "Pretty solid as a fruit"
});

const noName = new Fruit ({
    rating: 4,
    review: "Phantom Name N"
});

const pineapple = new Fruit ({
    name: "pineapple",
    rating: 4,
    review: "Pen apple pen"
});

// pineapple.save();

// Fruit.insertMany([orange, banana], (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Saved fruits");
//     }
// });


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const amy = new Person({
    name: "Amy",
    age: 30,
    favouriteFruit: pineapple
})

// amy.save();

const person = new Person({
    name: "John",
    age: 20,
})

// person.save(); 

// Person.deleteMany({name: "John"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success");
//     }
// })

// Fruit.find( (err, fruits) => {
//     if (err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();
//         console.log(fruits);
//         fruits.forEach((fruit)=> {
//             console.log(fruit.name);
//         })
//     }
// });

// Fruit.updateOne({_id: "63e5b2793ddc083c60a5a193"}, {name: "mango"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Success");
//     }
// })

Fruit.findOne({name: "Apple"}, (err, fruit) => {
    if (err) {
        console.log(err);
    } else {
        console.log(fruit);
        Person.updateOne({name: "John"}, {favouriteFruit: fruit}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Success updating");
            }
        });
        mongoose.connection.close();
    }
});


