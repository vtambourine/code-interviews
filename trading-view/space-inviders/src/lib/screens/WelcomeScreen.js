import ControlsState from '../states/controlsState';
import Screen from './Screen';

const BLINK_TIMEOUT = 1500;

/**
 * Welcome screen.
 * Only shows on game start.
 */
class WelcomeScreen extends Screen {
    /**
     * @param {Game} game
     */
    enter(game) {
        super.enter(game);

        this._gameState = game.getState();
        this._gameControls = game.getControls();
        this._onActionListener = this._onAction.bind(this);
        this._gameControls.on(ControlsState.actions.ACTION, this._onActionListener);
    }

    leave() {
        this._gameControls.removeListener(ControlsState.actions.ACTION, this._onActionListener);
    }

    render() {
        var ctx = this._ctx;
        var height = this._height;
        var width = this._width;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Space Inviders", width / 2, height / 2);
        if (Date.now() % BLINK_TIMEOUT > BLINK_TIMEOUT / 2) {
            ctx.fillText("Press space to start", width / 2, height / 2 + 24);
        }
    }

    _onAction() {
        //this._gameState.set({started: true});
        this._gameState.setStarted();
    }
}

export default WelcomeScreen;
