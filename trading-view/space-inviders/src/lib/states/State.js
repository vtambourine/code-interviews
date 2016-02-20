import {EventEmitter} from 'events';

/**
 * Абстрактный класс состояния.
 * Предоставляет методы чтения и записи параметров состояния и события их изменения.
 */
class State extends EventEmitter {
    constructor (properties = {}) {
        super();
        this._properties = properties;
        this._score = 0;
    }

    set (properties) {
        for (let key of Object.keys(properties)) {
            this._properties[key] = properties[key];
            this.emit(`${key}-change`, properties[key]);
        }
    }

    get (key) {
        return this._properties[key];
    }

    setStarted() {
        this.emit('start');
    }

    setStopped() {
        this.emit('stop');
    }

    getScore() {
        return this._score;
    }

    increaseScore(value) {
        this._score += value;
    }
}

export default State;
