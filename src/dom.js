import { logBoard, placeShipDom } from "./render.js";

const content = document.getElementById("content");
const alert = document.getElementById("alert");

const Carrier = { carrier: document.createElement("div"), size: 5 };
const Battleship = { Battleship: document.createElement("div"), size: 5 };
const Cruiser = { Cruiser: document.createElement("div"), size: 5 };
const Submarine = { Submarine: document.createElement("div"), size: 5 };
const Destroyer = { Carrier: document.createElement("div"), size: 5 };

const createShip = (size, ship) => {
  for (let i = 0; i < size; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    ship.appendChild(square);
  }
};

const shipContainer = () => {
  let Ships = document.createElement("div");
  Ships.id = "Ships";
};

/*const createGrid = (playerCell) => {
  const gridSize = 10;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add(`${playerCell}`);

    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    cell.dataset.row = row;
    cell.dataset.col = col;

    board.appendChild(cell);
  }
};

//createGrid("cell");

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    const cell = e.target;
    console.log(
      `Clicked cell at row ${cell.dataset.row}, col ${cell.dataset.col}`
    );
    logBoard();
    cell.style.backgroundColor = "lightgreen";
  }
});*/
