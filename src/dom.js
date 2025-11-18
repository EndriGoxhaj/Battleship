import { logBoard, placeShipDom } from "./render.js";

const content = document.getElementById("content");

const createGrid = () => {
  const gridSize = 10;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    cell.dataset.row = row;
    cell.dataset.col = col;

    content.appendChild(cell);
  }
};

createGrid();

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    const cell = e.target;
    console.log(
      `Clicked cell at row ${cell.dataset.row}, col ${cell.dataset.col}`
    );
    placeShipDom(cell);
    logBoard();
    cell.style.backgroundColor = "lightgreen";
  }
});
