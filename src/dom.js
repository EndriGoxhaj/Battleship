import { Player } from "./logic.js";
import {
  createBoard,
  shipDivs,
  boardTrespass,
  renderBoard,
  returnShip,
  highlightCells,
} from "./render.js";

let player1 = new Player();
let player2 = new Player();

const leftBoard = document.createElement("div");
leftBoard.classList.add("Board");
leftBoard.id = "leftBoard";

const rightBoard = document.createElement("div");
rightBoard.classList.add("Board");
rightBoard.id = "rightBoard";

const Boards = document.getElementById("Boards");
Boards.appendChild(leftBoard);

const content = document.getElementById("content");
content.appendChild(shipDivs(player1.navy.ships));

const button = document.createElement("button");
button.textContent = "direction = y";

const alert = document.getElementById("alert");
alert.appendChild(button);

const boardPopulate = (board, player) => {
  let selectedShipDiv = null;
  let selectedShipObject = null;
  let hoveredCell = [];
  let direction = "y";
  let ships = player.navy.ships;

  button.addEventListener("click", () => {
    if (direction === "y") {
      direction = "x";
    } else direction = "y";

    button.textContent = `direction = ${direction}`;
  });

  createBoard(board);

  alert.querySelectorAll(".ship").forEach((div) => {
    div.addEventListener("click", () => {
      if (selectedShipDiv) {
        selectedShipDiv.classList.remove("selected");
      }
      div.classList.add("selected");
      selectedShipDiv = div;
      selectedShipObject = ships.find((ship) => ship.name === div.dataset.name);
    });
  });

  board.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (cell.classList.contains("selected") || !selectedShipObject) {
        return;
      }
      let x = parseInt(cell.dataset.x);
      let y = parseInt(cell.dataset.y);

      if (direction === "y") {
        if (boardTrespass(y, shipLength)) return;
      } else {
        if (boardTrespass(x, shipLength)) return;
      }

      hoveredCell = returnShip(board, x, y, direction, selectedShipObject.size);
      highlightCells(hoveredCell);
    });
    cell.addEventListener("mouseout", () => {
      hoveredCell.forEach((cell) => {
        cell.classList.remove("selected");
        cell.style.cursor = "default";
      });
      hoveredCell.length = 0;
    });
    cell.addEventListener("click", () => {
      let x = parseInt(cell.dataset.x);
      let y = parseInt(cell.dataset.y);
      if (!selectedShipDiv) return;
      for (let i = 0; i < hoveredCell.length; i++) {
        if (hoveredCell[i].classList.contains("shipPlaced")) return;
      }

      if (direction === "y") {
        if (boardTrespass(y, selectedShipObject.size, cell)) return;
        player.field.placeShipHorizontally(selectedShipObject, x, y);
      }
      if (direction === "x") {
        if (boardTrespass(x, selectedShipObject.size, cell)) return;
        player.field.placeShipVertically(selectedShipObject, x, y);
      }

      hoveredCell.forEach((cell) => {
        cell.classList.add("shipPlaced");
      });
      alert.removeChild(selectedShipDiv);
      selectedShipDiv = null;
      selectedShipObject = null;

      if (alert.querySelectorAll(".ship").length == 0) {
        player.shipPlaced = true;
        if (player === player2 && player.shipPlaced) return;
        Boards.removeChild(leftBoard);
        Boards.appendChild(rightBoard);
        content.appendChild(shipDivs(player2.navy.ships));
        boardPopulate(rightBoard, player2);
      }
    });
  });
};
boardPopulate(leftBoard, player1);
