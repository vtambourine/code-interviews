import {EventEmitter} from 'events';
import Controls from './states/controlsState';
import State from './states/State';
import WelcomeScreen from './screens/WelcomeScreen';
import PlaygroundScreen from './screens/PlaygroundScreen';
import GameOverScreen from './screens/GameOverScreen';

import config from '../game.config';

/**
 * Core class for the entire game.
 * Creates and controls game screens.
 */
class Game {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor (canvas) {
        this._gameControls = new Controls();
        this._gameState = new State({
            started: false,
            lives: 3,
            score: 12
        });

        this._ctx = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        this._ctx.font = "24px VT323";

        this._loop = null;
    }

    /**
     * Returns state object of game controls.
     * @returns {ControlsState}
     */
    getControls() {
        return this._gameControls;
    }

    /**
     * Returns game state.
     * @returns {GameState}
     */
    getState() {
        return this._gameState;
    }

    /**
     * Returns game canvas object.
     * @returns {CanvasRenderingContext2D}
     */
    getContext() {
        return this._ctx;
    }

    /**
     * Starts main game loop and manages game screens.
     */
    start () {
        //this._setScreen(new WelcomeScreen());
        this._setScreen(new PlaygroundScreen());

        //this._gameState.on('start', (isStarted) => {
        //    if (isStarted) {
        //        this._setScreen(new PlaygroundScreen());
        //    } else {
        //        this._setScreen(new GameOverScreen());
        //    }
        //});
        this._gameState.on('start', () => {
            this._setScreen(new PlaygroundScreen());
        });
        this._gameState.on('stop', () => {
            this._setScreen(new GameOverScreen());
        });

        this._loop = setInterval(this._render.bind(this), 1000 / config.fps);
    }

    /**
     * Stops the game.
     */
    stop () {
        clearInterval(this._loop);
    }

    /**
     * @param {Screen} screen
     */
    _setScreen (screen) {
        if (this._currentScreen) {
            this._currentScreen.leave();
        }
        this._currentScreen = screen;
        this._currentScreen.enter(this);
    }

    _render () {
        this._currentScreen.render();
    }
}

export default Game;
