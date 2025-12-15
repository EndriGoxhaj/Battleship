import { Player } from "./logic.js";
import {
  createBoard,
  shipDivs,
  boardTrespass,
  renderBoard,
  returnShip,
  highlightCells,
  clearBoard,
  mouseEnter,
} from "./render.js";

let player1 = new Player();
let player2 = new Player();

const board = document.getElementById("Board");
const alert = document.createElement("alert");
alert.id = "alert";

const content = document.getElementById("content");

const gameStartBtn = document.createElement("button");
content.appendChild(gameStartBtn);
gameStartBtn.textContent = "Play";
gameStartBtn.addEventListener("click", () => {
  createBoard(board);
  content.appendChild(alert);
  boardPopulate(board, player1);
});

/*alert.appendChild(button);*/

const boardPopulate = (board, player) => {
  let selectedShipDiv = null;
  let selectedShipObject = null;
  let hoveredCell = [];
  let direction = "y";
  let ships = player.navy.ships;
  let x = 0;
  let y = 0;

  shipDivs(ships, alert);

  let button = document.createElement("button");
  button.textContent = "direction = y";
  alert.appendChild(button);
  button.addEventListener("click", () => {
    if (direction === "y") {
      direction = "x";
    } else direction = "y";

    button.textContent = `direction = ${direction}`;
  });

  alert.querySelectorAll(".ship").forEach((div) => {
    div.addEventListener("click", () => {
      if (selectedShipDiv) {
        selectedShipDiv.classList.remove("selected");
      }
      highlightCells(div, "selected");
      selectedShipDiv = div;
      selectedShipObject = ships.find((ship) => ship.name === div.dataset.name);
    });
  });

  let mouseEnter = (e) => {
    let cell = e.currentTarget;
    if (cell.classList.contains("selected") || !selectedShipObject) {
      return;
    }
    x = parseInt(cell.dataset.x);
    y = parseInt(cell.dataset.y);
    if (boardTrespass(x, y, direction, selectedShipObject.size)) return;
    hoveredCell = returnShip(board, x, y, direction, selectedShipObject.size);
    highlightCells(hoveredCell, "selected");
  };
  let mouseLeave = () => {
    hoveredCell.forEach((cell) => {
      cell.classList.remove("selected");
      cell.style.cursor = "default";
    });
    hoveredCell.length = 0;
  };
  let mouseClick = () => {
    if (!selectedShipDiv) return;
    for (let i = 0; i < hoveredCell.length; i++) {
      if (hoveredCell[i].classList.contains("shipPlaced")) return;
    }
    player.field.placeShip(selectedShipObject, x, y, direction);
    let placedShips = renderBoard(board, player.navy.ships);
    highlightCells(placedShips, "shipPlaced");
    alert.removeChild(selectedShipDiv);
    selectedShipDiv = null;
    selectedShipObject = null;
  };

  board.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("mouseenter", mouseEnter);
    cell.addEventListener("mouseleave", mouseLeave);
    cell.addEventListener("click", mouseClick);
  });
};
