document.querySelector("ul a").setAttribute("href","http://www.bing.com")
document.querySelector("button").style.backgroundColor = "yellow";
document.querySelector("h1").classList.add("huge");

function HouseKeeper (yearsOfExperience, name, cleaningRepertoire) {
    this.yearsOfExperience = yearsOfExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire
    this.clean = function () {
        alert("cleaning!");
    }
}

const allenCleaner = new HouseKeeper(12, "Allen", ["upstairs", "downstairs"]);

console.log(allenCleaner);