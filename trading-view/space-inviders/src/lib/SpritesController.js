import {EventEmitter} from 'events';
import SpritesCollection from './sprites/SpritesCollection';

class SpritesController extends EventEmitter {
    constructor() {
        super();
        this._generalSprites = new Set();
        this._singleSprites = [];
    }

    [Symbol.iterator]() {
        return this._generalSprites[Symbol.iterator]();
    }

    add(sprite) {
        if (sprite instanceof SpritesCollection) {
            for (let singleSprite of sprite.getSprites()) {
                this._singleSprites.push(singleSprite)
            }
        } else {
            this._singleSprites.push(sprite);
        }
        this._generalSprites.add(sprite);
        console.log('adde', this._generalSprites.size, sprite)
    }

    remove(sprite) {
        if (sprite instanceof SpritesCollection) {
            for (let singleSprite of sprite.getSprites()) {
                var singleSpriteIndex = this._singleSprites.indexOf(singleSprite);
                if (singleSpriteIndex) {
                    this._singleSprites.splice(singleSpriteIndex, 1);
                }
            }
        } else {
            var spriteIndex = this._singleSprites.indexOf(sprite);
            if (spriteIndex) {
                this._singleSprites.splice(spriteIndex, 1);
            }
        }
        this._generalSprites.delete(sprite);
    }

    update(ctx) {
        for (let sprite of this._generalSprites) {
            //if (sprite instanceof SpritesCollection) {
            //    for (let subSprite of sprite) {
            //        subSprite.update(ctx);
            //    }
            //} else {
            //    sprite.update(ctx);
            //}
            sprite.update(ctx);
            //console.log('update', sprite);
        }
        this._checkCollisions(ctx);
    }

    draw(ctx) {
        for (let sprite of this._generalSprites) {
            //if (sprite instanceof SpritesCollection) {
            //    for (let subSprite of sprite) {
            //        subSprite.draw(ctx);
            //    }
            //} else {
            //    sprite.draw(ctx);
            //}
            sprite.draw(ctx);
        }
    }

    _checkCollisions(ctx) {
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;
        for (let sprite of this._singleSprites) {
            var groupBorders = sprite.getBorders();
            for (let borders of Array.prototype.concat(groupBorders)) {
                if (borders.left < 0
                    || borders.top < 0
                    || borders.right > canvasWidth
                    || borders.bottom > canvasHeight) {
                    this.emit(SpritesController.events.OVERFLY, sprite);
                }
            }
        }

        for (let i = 0; i < this._singleSprites.length; i++) {
            for (let j = i + 1; j < this._singleSprites.length; j++) {
                if (this._singleSprites[i].collide(this._singleSprites[j])) {
                    //console.log('update', this._singleSprites[i], this._singleSprites[j]);
                    this.emit(SpritesController.events.COLLIDE, this._singleSprites[j]);
                    this.emit(SpritesController.events.COLLIDE, this._singleSprites[i]);
                }
            }
        }
    }
}

SpritesController.events = {
    OVERFLY: 'overfly',
    COLLIDE: 'collide'
};

export default SpritesController;
