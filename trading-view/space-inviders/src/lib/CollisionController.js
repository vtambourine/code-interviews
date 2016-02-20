import {EventEmitter} from 'events';
import SpritesCollection from './sprites/SpritesCollection';

class CollisionController extends EventEmitter {
    constructor() {
        super();
        this._generalSprites = [];
    }

    [Symbol.iterator]() {
        return this._generalSprites[Symbol.iterator]();
    }

    add(sprite) {
        this._generalSprites.push(sprite);
    }

    remove(sprite) {
        this._generalSprites.splice(this._generalSprites.indexOf(sprite), 1);
    }

    checkCollisions(ctx) {
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;
        for (let sprite of this._generalSprites) {
            var groupBorders = sprite.getBorders();
            for (let borders of Array.prototype.concat(groupBorders)) {
                if (borders.left < 0
                    || borders.top < 0
                    || borders.right > canvasWidth
                    || borders.bottom > canvasHeight) {
                    this.emit(CollisionController.events.OVERFLY, sprite);
                }
            }
        }

        for (let i = 0; i < this._generalSprites.length; i++) {
            for (let j = i + 1; j < this._generalSprites.length; j++) {
                //console.log('==', this._sprites.length)
                if (this._generalSprites[i].collides(this._generalSprites[j])) {
                    this.emit(CollisionController.events.COLLIDE, this._generalSprites[j]);
                    this.emit(CollisionController.events.COLLIDE, this._generalSprites[i]);
                }
            }
        }
    }
}

CollisionController.events = {
    OVERFLY: 'overfly',
    COLLIDE: 'collide'
};

export default CollisionController;
