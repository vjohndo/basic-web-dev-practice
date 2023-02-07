const drumButtonElements = document.querySelectorAll(".drum");

drumButtonElements.forEach(button => {
    button.addEventListener("click", () => {
        alert("A button has been clicked");
    })
})