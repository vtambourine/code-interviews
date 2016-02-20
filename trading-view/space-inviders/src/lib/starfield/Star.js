class Star {
    constructor(options) {
        this._x = options.x;
        this._y = options.y;
        this._velocity = options.velocity;
        this._size = options.size;
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        };
    }

    getVelocity() {
        return this._velocity;
    }

    getSize() {
        return this._size;
    }
}

export default Star;
