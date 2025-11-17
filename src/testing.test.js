import { experiments } from "webpack";
import { isSunk, playGame, Ships } from "./logic.js";

let fleet;
beforeEach(() => {
  fleet = new Ships();
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
  expect(playGame.board[1][8]).toEqual("X");
});
test("receive attack 3", () => {
  playGame.reciveAttack(1, 7);
});
