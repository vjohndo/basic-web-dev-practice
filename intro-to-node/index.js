console.log("hello world");

var superheroes = require("superheroes");
var mySuperHeroName = superheroes.random();


var supervillains = require("supervillains");
var mySuperVillainName = supervillains.random();
console.log(mySuperHeroName + " vs. " + mySuperVillainName);