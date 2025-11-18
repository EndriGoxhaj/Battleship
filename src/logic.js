import "./styles.css";

class Ships {
  constructor() {
    this.destroyed = 0;
    this.power = 5;
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
  constructor(navy = new Ships()) {
    (this.board = [
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
    ]),
      (this.navy = navy);
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
        this.isGameOver();
      }
    }
  }
  isGameOver() {
    if (this.navy.power === this.navy.destroyed) {
      this.gameOver();
      return true;
    } else return false;
  }
  gameOver() {
    console.log("Game Over");
  }
}

const isSunk = (ship) => {
  if (ship.size === ship.hits) {
    ship.sunk();
    return true;
  } else return false;
};

let playGame = new Gameboard();

export { isSunk, Gameboard, playGame };
