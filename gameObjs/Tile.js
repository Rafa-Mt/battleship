import engine from "../engine/Engine.js";
import GameObject from "../engine/GameObject.js";
import { tileConfig as config } from "../config.js";

export default class Tile extends GameObject {
    constructor(y, x, yM, xM) {
        super(config.layer);
        this.coords = {y:yM, x:xM};
        this.clickable = true;
        [this.y, this.x] = [y, x];
        const gap = config.style.gap;
        [this.h, this.w] = [config.style.height - gap, config.style.width - gap];
        this.content = [];
        this.state = "intact"
    }

    isEmpty() {
        return (this.content.length == 0)
    }

    isClicked(x,y) {
        if (!this.clickable) return false;
        return (
            x > this.x 
         && x < (this.x + this.w) 
         && y > this.y 
         && y < (this.y + this.h)
        );
    }

    static #states = ["intact", "failed", "shot", "sunk"];
    render() {
        const ctx = engine.canvas.getContext('2d');
        // ctx.fillStyle = config.style["bg-color"];
        ctx.strokeStyle = config.style["border-color"];
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        switch (this.state) {
            case "failed":
                ctx.strokeStyle = config.style["failed-color"];
                ctx.beginPath();
                    ctx.lineWidth = 10;
                    ctx.moveTo(this.x+10, this.y+10);
                    ctx.lineTo(this.x+this.w-10, this.y+this.h-10);
                    ctx.moveTo(this.x+this.w-10, this.y+10);
                    ctx.lineTo(this.x+10, this.y+this.h-10);
                ctx.stroke();
                ctx.lineWidth = 1;
                break;

            case "shot":
                ctx.strokeStyle = config.style["shot-color"];
                this.#drawCircle(ctx);
                ctx.lineWidth = 1;
                break;

            case "sunk":
                ctx.strokeStyle = config.style["sunk-color"];    
                this.#drawCircle(ctx);
                ctx.lineWidth = 1;
                break;
        }   
    }

    #drawCircle(ctx) {
        ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.arc(this.x + (this.w/2), this.y + (this.h/2), 17, 0, 2*Math.PI);
        ctx.stroke();
    }

    attack() {
        const states = {
            "intact": "failed",
            "failed": "shot",
            "shot": "sunk",
            "sunk": "intact"
        }
        this.state = states[this.state];
        console.log(this.state)
    }
}