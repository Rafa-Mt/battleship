export default class Ship {
    constructor(coords, size) {
        this.size = size;
        const unmovableAxis = {};
        const movableAxis = {};
        for (axis in coords) {
            if (typeof axis == "number") {
                unmovableAxis.index = axis;
                unmovableAxis.value = coords[axis];
                continue;
            }
            movableAxis.index = axis;
            movableAxis.value = [];
            axis.forEach((value) => {
                movableAxis.value.push(coords[axis][value])
            }) 
        }
        this.coords = [];
        movableAxis.value.forEach((value) => {
            const coord = Array(2);
            coord[unmovableAxis.index] = unmovableAxis.value;
            coord[movableAxis.index] = value;
        });
    }

    checkState() {

    }

}