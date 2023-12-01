export default class Ship {
    constructor(coords, size, board) {
        [this.segments, this.size, this.board] = [[], size, board];
        for (let coord in coords.x) {
            this.segments.push({x: coords.x[coord], y: coords.y[coord], shot: false});
        }

        this.segments.forEach((segment) => {
            this.board.tileset[segment.y][segment.x].addSegment(segment.y, segment.x, this)
        });
    }

    checkState() {
        const filtered = this.segments.filter((segment) => !segment.shot); 
        return filtered.length;
    }

    shoot(y, x) {
        for (let segment in this.segments){
            if (this.segments[segment].x == x && this.segments[segment].y == y) {
                this.segments[segment].shot = true;
            }
        }
    }
}