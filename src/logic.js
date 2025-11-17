import "./styles.css";

class Ships {
  constructor() {
    (this.carrier = {
      size: 5,
      hits: 0,
      hit() {
        this.hits++;
      },
      location: [],
      reserved: [],
    }),
      (this.battleship = {
        size: 4,
        hits: 0,
        hit() {
          this.hits++;
        },
        location: [],
        reserved: [],
      }),
      (this.Cruiser = {
        size: 3,
        hits: 0,
        hit() {
          this.hits++;
        },
        location: [],
        reserved: [],
      }),
      (this.submarine = {
        size: 3,
        hits: 0,
        hit() {
          this.hits++;
        },
        location: [],
        reserved: [],
      }),
      (this.destroyer = {
        size: 2,
        hits: 0,
        hit() {
          this.hits++;
        },
        location: [],
        reserved: [],
      });
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
    let tile = this.board[x][y];
    if (tile !== "" && tile != "X") {
      return this.board[x][y];
    } else {
      tile = "X";
      return false;
    }
  }
  reciveAttack(x, y) {
    if (!this.isHit()) return;
    else {
      if (isSunk(this.isHit)) {
        console.log("sunk");
      }
    }
  }
}

let playGame = new Gameboard();
const fleet = new Ships();
const isSunk = (ship) => {
  if (ship.size === ship.hits) return true;
  else return false;
};

export { isSunk, fleet, playGame, Ships, Gameboard };
