window.gameObjArray = [];

export default class GameObject {
    #layer;

    /**
     * @param {Number} layer 
     */
    constructor(layer = 0) {
        this.#layer = layer;
        window.gameObjArray.push(this);
        GameObject.#sortObjArray();
    }

    render() {
        console.log(this.#layer)
    }

    /**
     * @param {Number} value
     */
    set layer(value) {
        this.#layer = value;
        GameObject.#sortObjArray();
    }

    get layer() {
        return this.#layer;
    }

    static #sortObjArray() {
        gameObjArray.sort((a, b) => {
            if (a.layer === this.layer) return -1;
            if (b.layer === this.layer) return 1;
            return a.layer > b.layer ? -1 : 1;
        })
    }
}