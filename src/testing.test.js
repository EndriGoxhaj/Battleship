import { experiments } from "webpack";
import { Gameboard, isSunk } from "./logic.js";

let fleet;
let playGame;
beforeEach(() => {
  playGame = new Gameboard();
  fleet = playGame.navy;
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
      console.log("hit");
    },
  };
  expect(isSunk(mockShip)).toBe(true);
});

test("isSunk", () => {
  const mockShip = {
    hits: 4,
    size: 5,
    sunk: () => {
      console.log("hit");
    },
  };
  expect(isSunk(mockShip)).toBe(false);
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
  let board = new Gameboard(mockNavy);

  expect(board.isGameOver()).toBe(true);
});

test("Emulate Game", () => {
  let player1 = new Gameboard();
  let carrier = player1.navy.carrier;
  let board = player1.board;
  player1.placeShipHorizontally(carrier, 1, 3);

  expect(board[1][3]).toBe(carrier);
  player1.reciveAttack(2, 3);
  expect(board[2][3]).toEqual("X");
  expect(board[3][3]).toEqual("");
  player1.reciveAttack(1, 3);
  player1.reciveAttack(1, 4);
  player1.reciveAttack(1, 5);
  player1.reciveAttack(1, 6);
  expect(carrier.hits).toBe(4);
  expect(isSunk(carrier)).toBe(false);
  player1.reciveAttack(1, 7);
  expect(player1.navy.destroyed).toBe(1);
  carrier.sunk();
  carrier.sunk();
  carrier.sunk();
  expect(player1.isGameOver()).toBe(false);
  carrier.sunk();
  expect(player1.isGameOver()).toBe(true);
});
