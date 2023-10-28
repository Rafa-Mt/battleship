import GameObject from "./scripts/GameObject.js";
import gameEngine from "./scripts/Engine.js"
import layers from "./scripts/layers.js"

gameEngine.initCanvas(document.body);

class Square extends GameObject {
    constructor(x,y,w,h,color,layer=0) {
        super(layer);
        this.props = {x:x,y:y,w:w,h:h,color:color}
    }
    render() {
        const ctx = window.canvas.getContext('2d');

        ctx.fillStyle = this.props.color;
        ctx.fillRect(this.props.x, this.props.y, this.props.w, this.props.h);
    }
}

const s1 = new Square(45, 45, 170,170, "rgba(255, 0, 0, 1)", layers.ships);
const s2 = new Square(75, 75, 170,170, "rgba(0, 255, 0, 1)", layers.particles);
const s3 = new Square(105,105,170,170, "rgba(0, 0, 255, 1)", layers.ui);

gameEngine.run();