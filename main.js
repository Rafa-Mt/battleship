import GameObject from "./engine/GameObject.js";
import engine from "./engine/Engine.js"

document.body.appendChild(engine.canvas);

class Square extends GameObject {
    constructor(x,y,w,h,color='#000000',layer=0) {
        super(layer);
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    render() {
        const ctx = engine.canvas.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.strokeStyle='#252525';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        if (this.layer != engine.layers.background && false) {
            this.x += 1.5;
            this.y += 1;
        }
    }
}

const squares = [];

const genArray = (dims, side) => {
    squares.push(new Square(0,0,engine.canvas.width, engine.canvas.height, '#fdfdfd', engine.layers.background))
    for (let y = 0; y<dims; y++) {
        for (let x = 0; x<dims; x++) {
            squares.push(new Square(30+(side*x), 30+(side*y), side, side, "#f0f0f0", engine.layers.board))
        }
    }

    // window.canvas.addEventListener('mousemove', (event) => console.log(event.clientX, event.clientY))
}

genArray(10, 60);
// genFuncion(-20, 20, (x) => Math.pow(x,2), 2)

console.log(engine.gameObjArray)
engine.run();