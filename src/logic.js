import "./styles.css";

class Ships {
  constructor(destroyed = 0, power = 5) {
    this.destroyed = destroyed;
    this.carrier = {
      size: 5,
      hits: 0,
      hit() {
        this.hits++;
      },
      sunk: () => {
        this.destroyed++;
      },
      location: [],
      reserved: [],
    };
  }
}

class Gameboard {
  constructor(
    board = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]
  ) {
    this.board = board;
  }
  placeShipHorizontally(ship, x, y) {
    for (let i = y; i < y + ship.size; i++) {
      this.board[x][i] = ship;
      ship.location.push([x, i]);
    }
  }
  placeShipVertically(ship, x, y) {
    for (let i = x; i < x + ship.size; i++) {
      this.board[i][y] = ship;
      ship.location.push([i][y]);
    }
  }

  isHit(x, y) {
    if (this.board[x][y] !== "" && this.board[x][y] != "X") {
      this.board[x][y].hit();
      return this.board[x][y];
    } else {
      this.board[x][y] = "X";
      return false;
    }
  }
  reciveAttack(x, y) {
    let factor = this.isHit(x, y);
    if (!factor) return null;
    else {
      if (isSunk(factor)) {
      } else;
    }
  }
}

let playGame = new Gameboard();
const fleet = new Ships();
const isSunk = (ship) => {
  if (ship.size === ship.hits) {
    ship.sunk();
    return true;
  } else return false;
};

export { isSunk, fleet, playGame, Ships, Gameboard };
