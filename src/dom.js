import { Player } from "./logic.js";
let player1 = new Player();
let player2 = new Player();
const content = document.getElementById("content");

const leftBoard = document.getElementById("leftBoard");
const rightBoard = document.getElementById("rightBoard");

function createBoard(boardId) {
  const board = document.getElementById(boardId);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      board.appendChild(cell);
    }
  }
}

createBoard("leftBoard");
createBoard("rightBoard");

const createShip = (size, ship) => {
  for (let i = 0; i < size; i++) {
    let shipSize = document.createElement("div");
    shipSize.classList.add("cell");
    ship.appendChild(shipSize);
  }
};

const shipDivs = (ships) => {
  ships.forEach((ship) => {
    let shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.dataset.name = ship.name;
    createShip(ship.size, shipDiv);
    content.appendChild(shipDiv);
  });
};
const boardTrespass = (direction, size, cell) => {
  if (direction + size > 10) {
    cell.style.cursor = "not-allowed";
    return true;
  }
};

shipDivs(player1.navy.ships);
let turn = 1;

const boardPopulate = (board, player) => {
  let selectedShipDiv = null;
  let selectedShipObject = null;
  let hoveredCell = [];
  let direction = "y";
  let ships = player.navy.ships;
  let button = document.createElement("button");
  button.textContent = `direction = ${direction}`;
  content.appendChild(button);

  button.addEventListener("click", () => {
    if (direction === "y") {
      direction = "x";
    } else direction = "y";

    button.textContent = `direction = ${direction}`;
  });

  content.querySelectorAll(".ship").forEach((div) => {
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
      let shipLength = selectedShipObject.size;

      if (direction === "y") {
        if (boardTrespass(y, shipLength, cell)) return;
      } else {
        if (boardTrespass(x, shipLength, cell)) return;
      }

      for (let i = 0; i < shipLength; i++) {
        let target =
          direction == "y"
            ? board.querySelector(`.cell[data-x="${x}"][data-y="${y + i}"]`)
            : board.querySelector(`.cell[data-x="${x + i}"][data-y="${y}"]`);
        target.classList.add("selected");
        hoveredCell.push(target);
      }
    });
    cell.addEventListener("click", () => {
      let x = parseInt(cell.dataset.x);
      let y = parseInt(cell.dataset.y);
      if (!selectedShipDiv) return;
      let shipLength = selectedShipObject.size;
      for (let i = 0; i < hoveredCell.length; i++) {
        if (hoveredCell[i].classList.contains("shipPlaced")) return;
      }

      if (direction === "y") {
        if (boardTrespass(y, shipLength, cell)) return;
        player.field.placeShipHorizontally(selectedShipObject, x, y);
      }
      if (direction === "x") {
        if (boardTrespass(x, shipLength, cell)) return;
        player.field.placeShipVertically(selectedShipObject, x, y);
      }

      hoveredCell.forEach((cell) => {
        cell.classList.add("shipPlaced");
      });
      content.removeChild(selectedShipDiv);
      selectedShipDiv = null;
      selectedShipObject = null;
      if (content.querySelectorAll(".ship").length == 0) {
        content.append(shipDivs(player2.navy.ships));
        boardPopulate(rightBoard, player2);
      }
    });
    cell.addEventListener("mouseout", () => {
      hoveredCell.forEach((cell) => {
        cell.classList.remove("selected");
        cell.style.cursor = "default";
      });
      hoveredCell.length = 0;
    });
  });
};
boardPopulate(leftBoard, player1);
