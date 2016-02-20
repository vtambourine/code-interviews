import {EventEmitter} from 'events';

/**
 * Represents state of game controls, such as move, fire and action keys.
 */
class ControlsState extends EventEmitter {
    /**
     * Player press fire button.
     * @event ControlsState#fire
     */

    /**
     * Player press action button.
     * @event ControlsState#action
     */
    constructor () {
        super();
        this._modifiers = {};
    }

    /**
     * Checks if state has modified status.
     * @param {ControlsState.modifiers} key
     * @returns {boolean}
     */
    has(key) {
        return Boolean(this._modifiers[key]);
    }

    /**
     * Set modification status.
     * @param {ControlsState.modifiers} key
     */
    set(key) {
        this._modifiers[key] = true;
    }

    /**
     * Unset modification status.
     * @param {ControlsState.modifiers} key
     */
    unset(key) {
        delete this._modifiers[key];
    }

    /**
     * Emits action event.
     * @param {ControlsState.actions} key
     */
    trigger(key) {
        this.emit(key);
    }
}

/**
 * Supported modifiers keys.
 * @enum
 */
ControlsState.modifiers = {
    LEFT: 'left',
    RIGHT: 'right'
};

/**
 * Supported actions keys.
 * @enum
 */
ControlsState.actions = {
    FIRE: 'fire',
    ACTION: 'action'
};

export default ControlsState;
