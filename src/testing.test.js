import { isSunk, playGame, Ships } from "./logic.js";

let fleet;
beforeEach(() => {
  fleet = new Ships();
  playGame.placeShipHorizontally(fleet.carrier, 1, 3);
});
test("sunk", () => {
  expect(isSunk(fleet.carrier)).toBe(false);
});

test("hit", () => {
  fleet.carrier.hit();
  expect(fleet.carrier.hits).toBe(1);
});

test("populate", () => {
  expect(playGame.board[1][7]).toBe(fleet.carrier);
});
test("location", () => {
  console.log(fleet.carrier.location);
  expect(fleet.carrier.location[4]).toEqual([1, 7]);
});

test("isHit", () => {
  expect(playGame.isHit(1, 8)).toBe(false);
});
