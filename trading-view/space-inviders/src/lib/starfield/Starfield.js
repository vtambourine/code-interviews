import Sprite from '../sprites/Sprite';
import StarGenerator from './StarGenerator';
import config from '../../game.config';

/**
 * Фон с изрбражением звездного неба.
 */
class Starfield extends Sprite {
    constructor() {
        super();

        /**
         * Количество звезд на подложке.
         * @type {number}
         * @private
         */
        this._numberOfStars = config.numberOfStars || 10;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @overrides
     */
    initialize(ctx) {
        super.initialize(ctx);

        this._width = ctx.canvas.width;
        this._height = ctx.canvas.height;

        var stars = new Set();
        var starGenerator = new StarGenerator(this);
        for (let i = 0; i < this._numberOfStars; i++) {
            stars.add(starGenerator.getRandomStar());
        }
        this._stars = stars;
    }

    /**
     * @overrides
     */
    draw() {
        var ctx = this._ctx;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this._width, this._height);
        ctx.fillStyle = '#ffffff';
        for (let star of this._stars) {
            let position = star.getPosition();
            let size = star.getSize();
            ctx.fillRect(position.x, position.y, size, size);
        }
    }

    /**
     * Возвращает ширину фона.
     * @returns {number}
     */
    getWidth() {
        return this._width;
    }

    /**
     * Возвращает высоту фона.
     * @returns {number}
     */
    getHeight() {
        return this._height;
    }
}

export default Starfield;
