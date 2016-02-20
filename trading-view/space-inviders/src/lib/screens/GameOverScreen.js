import ControlsState from '../states/controlsState';
import Screen from './Screen';

const BLINK_TIMEOUT = 1500;

class GameOverScreen extends Screen {
    enter(game) {
        super.enter(game);

        this._gameState = game.getState();
        this._gameControls = game.getControls();
        this._onActionListener = this._onAction.bind(this);
        this._gameControls.addListener(ControlsState.actions.ACTION, this._onActionListener);
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

        this._ctx.font = "24px VT323";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", width / 2, height / 2);
        ctx.fillText(`Your score: ${this._gameState.get('score')}`, width / 2, height / 2 + 24);
        if (Date.now() % BLINK_TIMEOUT > BLINK_TIMEOUT / 2) {
            ctx.fillText("Press space to start", width / 2, height / 2 + 48);
        }
    }

    _onAction () {
        //this._gameState.set({started: true});
        this._gameState.setStarted();
    }
}

export default GameOverScreen;
