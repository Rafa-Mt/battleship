import { boardConfig, tileConfig } from '../config.js' 
import engine from '../engine/Engine.js';
import GameObject from '../engine/GameObject.js';
import Ship from './Ship.js';
import Tile from './Tile.js'

export default class Board extends GameObject {
    constructor(debug = false) {
        super(boardConfig.layer);
        this.debug = debug;
        this.tileset = this.#genTileset();
        this.ships = this.#genAllShips();
        engine.canvas.onmousedown = (event) => {
            this.tileset.flat().forEach((tile) => {
                if (tile == null) return;
                if (tile.isClicked(event.clientX, event.clientY)) {
                    // console.log(tile)
                    tile.clickable = false;
                    tile.attack();
                }
            })
        }

        if (this.debug) {
            this.tileset.forEach((row) => {
                row.forEach((element) => {
                    if (!element.isEmpty()) element.state = "debug";
                })
            })
        }

        console.log(this.ships)
    }

    #genTileset() {
        const [vertical, horizontal] = [boardConfig.size.vertical, boardConfig.size.horizontal];
        const [width, height] = [tileConfig.style.width, tileConfig.style.height];
        const [startX, startY] = [200,30];

        const tileset = Array.from({length: vertical}, (_, y) => (
            Array.from({length: horizontal}, (_, x) => (new Tile(startY+y*height, startX+x*width, y,x, this)))
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

            let coords;
            if (staticAxis == testY) coords = {x: range, y: Array(lenght+1).fill(staticAxis)};
            else coords = {y: range, x: Array(lenght+1).fill(staticAxis)};

            return new Ship(coords, lenght+1, this);
        }
    }

    render() {
        const [width, height] = [engine.canvas.width, engine.canvas.height];
        const ctx = engine.canvas.getContext('2d');
        ctx.fillStyle = boardConfig['bg-color'];
        ctx.fillRect(0, 0, width, height);
    }
}