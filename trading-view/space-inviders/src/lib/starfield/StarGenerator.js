import Star from './Star';
import config from '../../game.config';

class StarGenerator {
    /**
     * @param {Starfield} starfield
     */
    constructor(starfield) {
        this._starfield = starfield;
    }

    getRandomStar(options = {}) {
        return new Star({
            x: options.x || Math.random() * this._starfield.getWidth(),
            y: options.y || Math.random() * this._starfield.getHeight(),
            velocity: options.velocity || Math.random() * (config.maxVelocity - config.minVelocity) + config.minVelocity,
            size: options.size || Math.random() * 3 + 1
        });
    }
}

export default StarGenerator;
