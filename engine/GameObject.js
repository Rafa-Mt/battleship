import engine from "./Engine.js";

export default class GameObject {
    #layer;
    
    /**
     * @param {Number} layer 
     */
    constructor(layer = 0) {
        this.#layer = layer;
        engine.gameObjArray.push(this);
        GameObject.#sortObjArray();
    }

    render() { }
    checkClick() { }
    
    /**
     * @param {Number} value
     */
    set layer(value) {
        if (value < 0) throw new Error("No negative layers");
        this.#layer = Math.ceil(value);
        GameObject.#sortObjArray();
    }

    get layer() {
        return this.#layer;
    }

    static #sortObjArray() {
        engine.gameObjArray.sort((a, b) => {
            if (a.layer === b.layer) return 0;
            if (a.layer === this.layer) return -1;
            if (b.layer === this.layer) return 1;
            return a.layer > b.layer ? -1 : 1;
        })
    }
}