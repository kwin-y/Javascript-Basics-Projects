const grid = document.querySelector("#grid");
const changeGridButton = document.querySelector("#change-grid");

function createGrid(size) {

    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {

        const square = document.createElement("div");

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        //whenever the mouse enters a square, change its background color to black
        square.addEventListener("mouseenter", () => {
            square.style.backgroundColor = "black";
        });

        grid.appendChild(square);
    }
}

createGrid(16);

changeGridButton.addEventListener("click", () => {
    const input = prompt("Enter the number of squares per side:");

    if (input == null){
        returnl
    }

    const size = Number(input);

    if (size < 1 || size > 100 || isNaN(size)) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    grid.innerHTML = "";
    createGrid(size);
});