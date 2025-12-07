import { player1 } from "./logic.js";

const content = document.getElementById("content");
const leftBoard = document.getElementById("leftBoard");
const rightBoard = document.getElementById("rightBoard");

const ships = player1.navy.ships;

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

const shipDivs = (ships = player1.navy.ships) => {
  let shipContainer = document.createElement("div");
  shipContainer.id = "shipContainer";
  ships.forEach((ship) => {
    let shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.dataset.name = ship.name;
    createShip(ship.size, shipDiv);
    shipContainer.appendChild(shipDiv);
  });
  return shipContainer;
};

let selectedShip = null;
let selectedShipObject = null;
let hoveredCell = [];
let direction = "y";

(() => {
  let horizontalButton = document.createElement("button");
  let verticalButton = document.createElement("button");
  horizontalButton.textContent = "horizontal";
  verticalButton.textContent = "vertical";

  content.append(shipDivs(), horizontalButton, verticalButton);

  content.querySelectorAll(".ship").forEach((div) => {
    div.addEventListener("click", () => {
      if (selectedShip) {
        selectedShip.classList.remove("selected");
      }
      div.classList.add("selected");
      selectedShip = div;
      selectedShipObject = ships.find((ship) => ship.name === div.dataset.name);
    });
  });
  leftBoard.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (cell.classList.contains("selected") || !selectedShipObject) {
        return;
      }
      let x = parseInt(cell.dataset.x);
      let y = parseInt(cell.dataset.y);
      let shipLength = selectedShipObject.size;
      if (direction == "y") {
        if (y + shipLength > 10) {
          cell.style.cursor = "not-allowed";
          return;
        }
        for (let i = 0; i < shipLength; i++) {
          let target = leftBoard.querySelector(
            `.cell[data-x="${x}"][data-y="${y + i}"]`
          );
          target.classList.add("selected");
          hoveredCell.push(target);
        }
      }
    });
    cell.addEventListener("click", () => {
      if (!selectedShipObject) return;
      hoveredCell.forEach((cell) => {
        cell.classList.add("shipPlaced");
        selectedShipObject = null;
        let shipContainer = document.getElementById("shipContainer");
      });
      shipContainer.removeChild(selectedShip);
    });
    cell.addEventListener("mouseout", () => {
      hoveredCell.forEach((cell) => {
        cell.classList.remove("selected");
        cell.style.cursor = "default";
      });
      hoveredCell.length = 0;
    });
  });
})();
