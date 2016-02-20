class GameState {
    constructor() {
        this._state = {
            moveLeft: false,
            moveRight: false,
            fire: false
        }
    }

    get() {
        return this._state;
    }

    push(name) {
        this._state[name] = true;
    }
}

export default new GameState();
