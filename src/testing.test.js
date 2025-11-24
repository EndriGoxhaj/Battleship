import { Player } from "./logic.js";

let fleet;
let player;
let playGame;
beforeEach(() => {
  player = new Player();
  playGame = player.field;
  fleet = player.navy;
  playGame.placeShipHorizontally(fleet.carrier, 1, 3);
});
test("sunk", () => {
  fleet.carrier.sunk();
  fleet.carrier.sunk();
  expect(fleet.destroyed).toEqual(2);
});

test("isSunk", () => {
  const mockShip = {
    hits: 5,
    size: 5,
    sunk: () => {
      console.log("sunk");
    },
  };
  expect(fleet.isSunk(mockShip)).toBe(true);
});

test("isSunk", () => {
  const mockShip = {
    hits: 4,
    size: 5,
    sunk: () => {
      console.log("sunk");
    },
  };
  expect(fleet.isSunk(mockShip)).toBe(false);
});

test("hit", () => {
  fleet.carrier.hit();
  expect(fleet.carrier.hits).toBe(1);
});

test("populate", () => {
  expect(playGame.board[1][7]).toBe(fleet.carrier);
});
test("location", () => {
  expect(fleet.carrier.location[4]).toEqual([1, 7]);
});

test("isHit", () => {
  expect(playGame.isHit(1, 8)).toBe(false);
});

test("receive attack", () => {
  expect(player.reciveAttack(1, 8)).toBe(null);
});
test("receive attack 2", () => {
  player.reciveAttack(1, 8);
  expect(playGame.board[1][8]).toEqual("X");
});
test("receive attack 3", () => {
  player.reciveAttack(1, 7);
});
test("isGameOver", () => {
  let mockNavy = {
    power: 5,
    destroyed: 5,
  };
  let player1 = new Player(playGame, mockNavy);
  expect(player1.isGameOver()).toBe(true);
});
