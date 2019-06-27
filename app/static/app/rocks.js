class Rocks {
    constructor() {
        this.x = map(random(1), 0, 1, 0, width);
        this.y = 0;
        this.v = 2;
    }

    move() {
        this.y += this.v;
    }


    show() {
        fill(0);
        rect(this.x, this.y, 50, 50);
    }


}