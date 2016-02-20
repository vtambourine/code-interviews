import config from '../../game.config';

class Sprite {
    constructor(frames) {
        this._frames = frames;
        this._totalFrames = this._frames.length;
        this._position = {x: 0, y: 0};
        this._runnigFrame = 0;

        var pixelWidth = 0;
        var pixelHeight = 0;
        for (let frame of frames) {
            let width = 0;
            let height = frame.length;
            if (height > pixelHeight) {
                pixelHeight = height;
            }
            for (let i = 0; i < frame.length; i++) {
                width = frame[i].length;
                if (width > pixelWidth) {
                    pixelWidth = width;
                }
            }
        }
        this._width = pixelWidth * Sprite.PIXEL_SIZE;
        this._height = pixelHeight * Sprite.PIXEL_SIZE;
    }

    getBorders() {
        return {
            left: this._position.x - this._width / 2,
            top: this._position.y - this._height / 2,
            right: this._position.x + this._width / 2,
            bottom: this._position.y + this._height / 2
        };
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getPosition() {
        return this._position;
    }

    setPosition(position) {
        this._position = position;
    }

    //collides(sprite) {
    //    var groupBorders = sprite.getBorders();
    //    if (groupBorders instanceof Array) {
    //        return groupBorders.some((borders) => {
    //            return this._checkCollision(borders);
    //        });
    //    } else {
    //        return this._checkCollision(groupBorders);
    //    }
    //}
    //
    //_checkCollision(spriteBorders) {
    //    return Array.prototype.concat(this.getBorders()).some((currentBorder) => {
    //        return !(
    //            currentBorder.right < spriteBorders.left
    //            || currentBorder.left > spriteBorders.right
    //            || currentBorder.top > spriteBorders.bottom
    //            || currentBorder.bottom < spriteBorders.top
    //        );
    //    });
    //}

    collide(sprite) {
        var borders = this.getBorders();
        var spriteBorders = sprite.getBorders();
        return !(
            borders.right < spriteBorders.left
            || borders.left > spriteBorders.right
            || borders.top > spriteBorders.bottom
            || borders.bottom < spriteBorders.top
        );
    }

    update() {
        this._runnigFrame += 1;
        if (this._runnigFrame >= config.fps) {
            this._runnigFrame = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ffffff';
        var currentFrame = Math.floor(this._runnigFrame / Math.floor(config.fps / this._totalFrames));
        var frame = this._frames[currentFrame];
        for (let i = 0; i < frame.length; i++) {
            for (let j = 0; j < frame[i].length; j++) {
                if (frame[i][j]) {
                    ctx.fillRect(
                        (this._position.x - this._width / 2) + Sprite.PIXEL_SIZE * j,
                        (this._position.y - this._height / 2) + Sprite.PIXEL_SIZE * i,
                        Sprite.PIXEL_SIZE,
                        Sprite.PIXEL_SIZE
                    );
                }
            }
        }
    }
}

Sprite.PIXEL_SIZE = 10;

export default Sprite;
