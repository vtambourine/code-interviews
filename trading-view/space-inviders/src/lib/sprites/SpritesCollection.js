import Sprite from './SpritesCollection';

class SpritesCollection {
    constructor() {
        this._sprites = new Set();
    }

    [Symbol.iterator]() {
        return this._sprites[Symbol.iterator]();
    }

    add(sprite) {
        this._sprites.add(sprite);
    }

    remove(sprite) {
        this._sprites.delete(sprite);
    }

    getSprites() {
        return this._sprites;
    }
}

export default SpritesCollection;
