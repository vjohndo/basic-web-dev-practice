// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [honda, tesla] = cars;
const {coloursByPopularity: [hondaTopColour] , speedStats: {topSpeed: hondaTopSpeed}} = honda;
const {coloursByPopularity: [teslaTopColour] , speedStats: {topSpeed: teslaTopSpeed}} = tesla;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);


// Desstructuring examples:

// import animals, { useAnimals } from "./data";

// console.log(animals);

// const [cat, dog, def] = animals;

// const [animal, makeSound] = useAnimals(cat);

// console.log(animal);
// makeSound();

// console.log(cat);
// console.log(dog);

// const { sound, name, feedingRequirements: { food, water } } = cat;

// console.log(name);
// console.log(sound);
// console.log(food);
// console.log(water);

// const { name: dogName, sound: dogSound } = dog;

// console.log(dogName);
// console.log(dogSound);

// const { name: randPet = "Def", sound: randSound = "BURP" } = def;
// console.log(randPet);
// console.log(randSound);
