import Sprite from './Sprite';

class Invader extends Sprite {
    constructor() {
        super([
            [
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0]
            ],
            [
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1]
            ]
        ])
    }
}

export default Invader;
