import Sprite from './Sprite';

class Ship extends Sprite {
    constructor() {
        super([
            [
                [0,0,1,0,0],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            //[
            //    [0,0,1,0,0],
            //    [0,1,1,1,0],
            //    [1,1,1,1,1]
            //]
        ]);
    }
}

export default Ship;
