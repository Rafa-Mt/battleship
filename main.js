import GameObject from "./engine/GameObject.js";
import engine from "./engine/Engine.js"
import Board from "./gameObjs/Board.js";

document.body.appendChild(engine.canvas);

// GameLoop

const board = new Board(true);
// console.log(engine.gameObjArray)
// console.log(board.tileset, board.ships)
engine.run();