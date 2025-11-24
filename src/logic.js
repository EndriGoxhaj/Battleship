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
  isSunk(ship) {
    if (ship.size === ship.hits) {
      ship.sunk();
      return true;
    } else return false;
  }
}

class Gameboard {
  constructor() {
    this.board = [
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
    ];
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
}

class Player {
  constructor(field = new Gameboard(), navy = new Ships()) {
    this.field = field;
    this.navy = navy;
  }
  reciveAttack(x, y) {
    let result = this.field.isHit(x, y);
    if (!result) return null;
    else {
      if (this.navy.isSunk(result)) {
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

//let playGame = new Gameboard();

export { Player };
