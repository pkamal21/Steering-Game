class Car {
    constructor() {
        this.r = width / 2
        this.x = this.r;
        this.y = height - 50;
        this.v = 0;
    }


    move(sign) {
        this.x += this.v;
        this.x = constrain(this.x, 0, width - 40);
    }
    left() {
        this.v = -2.5;
    }
    right() {
        this.v = 2.5;
    }
    collides(rock) {
        return collideRectRect(this.x, this.y, 40, 40, rock.x, rock.y, 50, 50);


    }
    show() {
        fill(120, 220, 60)
        rect(this.x, this.y, 40, 40);
    }
}