import SpritesCollection from './SpritesCollection';
import Invader from './Invader';

const FLEET_FORMATION = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1]
];

class InvaderFleet extends SpritesCollection {
    constructor() {
        super();
        this._sprites = this.getSprites();
        this._direction = 1;
    }

    prepare(ctx) {
        this._canvasWidth = ctx.canvas.width;
        this._canvasHeight = ctx.canvas.height;

        this._height = FLEET_FORMATION.length;
        for (let i = 0; i < FLEET_FORMATION.length; i++) {
            for (let j = 0; j < FLEET_FORMATION[i].length; j++) {
                if (FLEET_FORMATION[i][j]) {
                    let invader = new Invader();
                    this._width = FLEET_FORMATION[i].length * invader.getWidth();
                    invader.setPosition({
                        x: this._canvasWidth / 2 - this._width / 2 + (invader.getWidth() + 10) * j,
                        y: (invader.getHeight() + 10) * i + 30
                    });
                    this.add(invader);
                }
            }
        }
    }

    getBorders() {
        return this.getSprites().map((invader) => {
            return invader.getBorders();
        });
    }

    getTotalBorders() {
        var left = Infinity;
        var top = Infinity;
        var right = 0;
        var bottom = 0;
        for (let invader of this.getSprites()) {
            let invaderBorders = invader.getBorders();
            if (invaderBorders.left < left) left = invaderBorders.left;
            if (invaderBorders.top < top) top = invaderBorders.top;
            if (invaderBorders.right > right) right = invaderBorders.right;
            if (invaderBorders.bottom > bottom) bottom = invaderBorders.bottom;
        }
        return {left, top, right, bottom};
    }

    getInvaders() {
        return this.getSprites();
    }

    //collides(sprite) {
    //    return this._sprites.some((invader) => {
    //        return invader.collides(sprite);
    //    });
    //}

    //remove(invader) {
    //    this._sprites.splice(this._sprites.indexOf(invader), 1);
    //    this.remove(invader);
    //}

    update(ctx) {
        var down = 15;
        var borders = this.getTotalBorders();
        if (borders.left < 10) {
            this._direction = 1;
            this._down = down
        } else if (borders.right > this._canvasWidth - 10) {
            this._direction = -1;
            this._down = down
        } else {
            this._down = 0;
        }
        for (let invader of this.getSprites()) {
            //console.log('..', invader);
            let position = invader.getPosition();
            invader.setPosition({
                x: position.x + 10 * this._direction,
                y: position.y + this._down
            });
            invader.update(ctx);
        }
    }

    draw(ctx) {
        for (let invader of this.getSprites()) {
            invader.draw(ctx);
        }
    }
}

export default InvaderFleet;
