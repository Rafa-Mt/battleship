import { boardConfig, tileConfig } from '../config.js' 
import engine from '../engine/Engine.js';
import GameObject from '../engine/GameObject.js';
import Ship from './Ship.js';
import Tile from './Tile.js'

export default class Board extends GameObject {
    constructor() {
        super(boardConfig.layer);
        this.tileset = this.#genTileset();
        this.ships = this.#genAllShips();
        engine.canvas.onmousedown = (event) => {
 
            this.tileset.flat().forEach((tile) => {
                if (tile == null) return;
                if (tile.isClicked(event.clientX, event.clientY)) {
                    console.log(tile)
                    const coords = tile.coords;
                    // this.tileset[coords.y][coords.x].clickable = false;
                    // this.tileset[coords.y][coords.x].state = tile.state == "failed" ? "failed" : "shot";
                    // this.tileset[coords.y][coords.x].state = "failed";
                    tile.attack();
                }
            })
        }
    }

    #genTileset() {
        const [vertical, horizontal] = [boardConfig.size.vertical, boardConfig.size.horizontal];
        const [width, height] = [tileConfig.style.width, tileConfig.style.height];
        const [startX, startY] = [200,30];

        const tileset = Array.from({length: vertical}, (_, y) => (
            Array.from({length: horizontal}, (_, x) => (new Tile(startY+y*height, startX+x*width, y,x)))
        ));

        return tileset;
    }

    #genAllShips() {
        const ships = [];
        boardConfig['ship-templates'].forEach((template) => {
            const amount = Array.from(
                {length: template.amount}, () => (this.#genShip(template.lenght))
            );
            
            amount.forEach((ship) => ships.push(ship));
        })
        return ships;
    }

    #genShip(lenght) {
        let ship = null;
        while (ship == null) {
            const axles = [boardConfig.size.horizontal,boardConfig.size.vertical]
            const testX = Math.floor(Math.random() * axles[0]);
            const testY = Math.floor(Math.random() * axles[1]);

            if (!this.tileset[testY][testX].isEmpty()) continue;

            const axisSelector = Math.floor(Math.random()*2);
            const start = [testX, testY][axisSelector]
            const end = start + lenght; 
            const axis = axles[axisSelector];

            if (end > axis - 1) continue; 
            
            const range = [...Array(end - start + 1).keys()].map(x => x + start);
            const staticAxis = [testX, testY][1-axisSelector]; 
            const invalids = [];

            range.forEach((movingAxis) => {
                const tile = Boolean(axisSelector) ? this.tileset[movingAxis][staticAxis] : this.tileset[staticAxis][movingAxis];
                if (!tile.isEmpty()) {
                    invalids.push(tile);
                }
            });
            if (invalids.length != 0) continue;
            return new Ship({x: range, y: staticAxis}, )
        }
    }

    render() {
        const [width, height] = [engine.canvas.width, engine.canvas.height];
        const ctx = engine.canvas.getContext('2d');
        ctx.fillStyle = boardConfig['bg-color'];
        ctx.fillRect(0, 0, width, height);
    }
}