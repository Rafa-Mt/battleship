let instance;
let globalState = {};

class Engine {
    #animationFrame;
    constructor() {
        if (instance) {
            throw new Error("Code violates Singleton design")
        }

        instance = this;
    }

    getProperty(name) {
        return globalState[name];
    }

    setProperty(name, value) {
        globalState[name] = value;
    }

    run() {
        const loop = () => {
            window.gameObjArray.forEach((obj) => {
                obj.render();
            })
            
            this.#animationFrame = window.requestAnimationFrame(loop);
        }
        loop();    
    }

    stop() {
        window.cancelAnimationFrame(this.#animationFrame);
    }

    /**
     * @param {HTMLElement} parentNode 
     */
    initCanvas(parentNode) {
        const canvas = document.createElement('canvas');
        
        canvas.id = "Battleship";
        canvas.style.boxSizing = 'border-box'
        canvas.style.margin = 0;
        canvas.style.padding = 0;
        canvas.style.position = 'absolute'
        canvas.style.top = 0;
        canvas.style.left = 0;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        parentNode.appendChild(canvas);
        window.canvas = canvas;

        window.onresize = (event) => {
            window.canvas.width = window.innerWidth;
            window.canvas.height = window.innerHeight;
        };
    }
}

const gameEngine = Object.freeze(new Engine());
export default gameEngine;