import { Player } from "./logic";
let player = new Player();

const placeShipDom = (cell) => {
  let x = parseInt(cell.dataset.row);
  let y = parseInt(cell.dataset.col);
  playGame.placeShipHorizontally(playGame.navy.carrier, x, y);
};

const logBoard = () => {
  console.log(playGame.board);
};
export { placeShipDom, logBoard };
