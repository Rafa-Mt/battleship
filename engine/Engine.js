let instance;
let globalState = {};

class Engine {
    #animationFrame;
    constructor() {
        this.canvas = this.#initCanvas();
        this.layers = Object.freeze({
            important: 0, // Not reccomended to use
            popups: 1,
            ui: 2,
            particles: 3,
            ships: 4,
            boardOverlay: 5,
            board: 6,
            background: 7,
        });
        this.gameObjArray = [];
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
            this.gameObjArray.forEach((obj) => {
                obj.render();
            })
            
            this.#animationFrame = window.requestAnimationFrame(loop);
        }
        loop();    
    }

    stop() {
        window.cancelAnimationFrame(this.#animationFrame);
    }

    #initCanvas() {
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

        window.onresize = (event) => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        return canvas;
    }
}

const engine = Object.freeze(new Engine());
export default engine;