import { Player } from "./logic.js";
import { renderShips } from "./render.js";

let fleet;
let player;
let playGame;
beforeEach(() => {
  player = new Player();
  playGame = player.field;
  fleet = player.navy.ships;
  playGame.placeShipHorizontally(fleet[0], 1, 3);
});

test("isSunk", () => {
  const mockShip = {
    hits: 5,
    size: 5,
    sunk: () => {
      console.log("sunk");
    },
  };
  expect(playGame.isSunk(mockShip)).toBe(true);
});

test("isSunk", () => {
  const mockShip = {
    hits: 4,
    size: 5,
    sunk: () => {
      console.log("sunk");
    },
  };
  expect(playGame.isSunk(mockShip)).toBe(false);
});

test("hit", () => {
  fleet[0].hit();
  expect(fleet[0].hits).toBe(1);
});

test("populate", () => {
  expect(playGame.board[1][7]).toBe(fleet[0]);
});
test("location", () => {
  expect(fleet[0].location[4]).toEqual([1, 7]);
});

test("isHit", () => {
  expect(playGame.isHit(1, 8)).toBe(false);
});

test("receive attack", () => {
  expect(playGame.reciveAttack(1, 8)).toBe(null);
});
test("receive attack 2", () => {
  playGame.reciveAttack(1, 8);
  expect(playGame.board[1][8]).toEqual("X");
});
test("receive attack 3", () => {
  playGame.reciveAttack(1, 7);
});
test("isGameOver", () => {
  let mockNavy = {
    power: 5,
    destroyed: 5,
  };
  let player1 = new Player(playGame, mockNavy);
  expect(player1.isGameOver()).toBe(true);
});
