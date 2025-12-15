const content = document.getElementById("content");

function createBoard(board) {
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
const clearBoard = (board) => {
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("shipPlaced");
  });
};
const renderBoard = (board, ships) => {
  let shipsArray = [];
  for (let i = 0; i < ships.length; i++) {
    let x = ships[i].locationX;
    let y = ships[i].locationY;
    shipsArray.push(returnShip(board, x, y, ships[i].direction, ships[i].size));
  }
  return shipsArray;
};
const returnShip = (board, x, y, direction, shiplength) => {
  let ships = [];
  for (let i = 0; i < shiplength; i++) {
    let target =
      direction == "y"
        ? board.querySelector(`.cell[data-x="${x}"][data-y="${y + i}"]`)
        : board.querySelector(`.cell[data-x="${x + i}"][data-y="${y}"]`);
    ships.push(target);
  }
  return ships;
};
const createShip = (size, ship) => {
  for (let i = 0; i < size; i++) {
    let shipSize = document.createElement("div");
    shipSize.classList.add("cell");
    ship.appendChild(shipSize);
  }
};

const shipDivs = (ships, dock) => {
  ships.forEach((ship) => {
    let shipDiv = document.createElement("div");
    shipDiv.classList.add("ship");
    shipDiv.dataset.name = ship.name;
    createShip(ship.size, shipDiv);
    dock.appendChild(shipDiv);
  });
};
const boardTrespass = (x, y, direction, size) => {
  if (direction === "y") {
    if (y + size > 10) {
      return true;
    }
  } else {
    if (x + size > 10) return true;
  }
};
const highlightCells = (cells, className) => {
  if (Array.isArray(cells)) {
    cells.forEach((cell) => {
      if (Array.isArray(cell)) {
        cell.forEach((div) => {
          if (!div) return;
          div.classList.add(className);
        });
      } else cell.classList.add(className);
    });
  } else cells.classList.add(className);
};

export {
  createBoard,
  shipDivs,
  boardTrespass,
  renderBoard,
  returnShip,
  highlightCells,
  clearBoard,
};
