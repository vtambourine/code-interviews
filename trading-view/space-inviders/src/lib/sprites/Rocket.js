import Sprite from './Sprite';

class Rocket extends Sprite {
    constructor() {
        super([
            [
                [1],
                [1]
            ]
        ]);
    }

    update() {
        this._position.y -= 10;
    }
}

export default Rocket;
