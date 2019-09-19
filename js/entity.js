class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed;
        this.img; //Assign this after instantiating
        // this.sizeMod = 4; //Size multiplier on top of objSize
    }

    update() {
    }

    render() {
        ctx.drawImage(this.img, this.x, this.y);
    }
}


class Player extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isSelected = false;
        this.isMoving = false; //Size multiplier on top of objSize
    }

    update(x, y) {
        this.y += y;
        this.x += x;
    }

    render() {
        ctx.drawImage(this.img, this.x, this.y);
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super(x, y);
        this.isMoving = false; //Size multiplier on top of objSize
    }

    update() {
        if (this.isMoving) {
            if (this.x < 0) {
                this.x = canvas.width
            }
            this.x -= enemySpeed;
        }
    }

    render() {
        ctx.drawImage(this.img, this.x, this.y);
    }
}




