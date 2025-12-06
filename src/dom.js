import { shipDivs, createBoard } from "./render.js";

const content = document.getElementById("content");
createBoard("leftBoard");
createBoard("rightBoard");

content.appendChild(shipDivs());
