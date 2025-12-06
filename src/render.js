import { player1 } from "./logic";

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

const shipDivs = (ships = player1.navy.ships) => {
  let shipContainer = document.createElement("div");
  shipContainer.classList.add("shipcontainer");
  ships.forEach((ship) => {
    let shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.dataset.name = ship.name;
    shipDiv.dataset.size = ship.size;
    createShip(ship.size, shipDiv);
    shipContainer.appendChild(shipDiv);
  });
  return shipContainer;
};
const placeShips = (ship, position) => {
  if (position == "horzontal") {
    player1.field.placeShipHorizontally(ship, x, y);
  }
};

const createShip = (size, ship) => {
  for (let i = 0; i < size; i++) {
    let shipSize = document.createElement("div");
    shipSize.classList.add("cell");
    ship.appendChild(shipSize);
  }
};

export { createBoard, shipDivs };
