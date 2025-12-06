class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.location = [];
    this.reserved = [];
  }
  hit() {
    this.hits++;
  }
}

class Navy {
  constructor() {
    const shipsdefinitions = [
      { name: "carrier", size: 5 },
      { name: "battleship", size: 4 },
      { name: "cruiser", size: 3 },
      { name: "submarine", size: 3 },
      { name: "destroyer", size: 2 },
    ];

    this.ships = shipsdefinitions.map((d) => new Ship(d.name, d.size));
  }
}

class Gameboard {
  constructor() {
    this.destroyed = 0;
    this.power = 5;
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
  reciveAttack(x, y) {
    let result = this.isHit(x, y);
    if (!result) return null;
    else {
      if (this.isSunk(result)) {
        this.isGameOver();
      }
    }
  }
  isSunk(ship) {
    if (ship.size === ship.hits) {
      this.destroyed++;
      return true;
    } else return false;
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
  constructor(field = new Gameboard(), navy = new Navy()) {
    this.field = field;
    this.navy = navy;
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

const player1 = new Player();

export { Player, player1 };
