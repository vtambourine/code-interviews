import ControlsState from '../states/controlsState';
import Screen from '../screens/Screen';
import Ship from '../sprites/Ship';
import Rocket from '../sprites/Rocket';
import Invader from '../sprites/Invader';
import InvadersFleet from '../sprites/InvadersFleet';
import SpritesCollection from '../sprites/SpritesCollection';
import SpritesController from '../SpritesController';
import CollisionController from '../CollisionController';

const COOLDOWN = 1000;

class PlaygroundScreen extends Screen {
    constructor() {
        super();
    }

    enter(game) {
        super.enter(game);

        this._lastShot = 0;

        this._gameState = game.getState();

        this._gameControls = game.getControls();
        this._onActionListener = this._onAction.bind(this);
        this._gameControls.on(ControlsState.actions.ACTION, this._onActionListener);
        this._onFireListener = this._onFire.bind(this);
        this._gameControls.on(ControlsState.actions.FIRE, this._onFireListener);

        this._spritesController = new SpritesController();

        this._ship = new Ship();
        this._ship.setPosition({
            x: this._width / 2,
            y: this._height - this._ship.getHeight() / 2 - 20
        });

        //this._spritesController.add(this._ship);

        this._spritesController.on(SpritesController.events.COLLIDE, (sprite) => {
            if (sprite instanceof Ship) {
                //this._gameState.set({started: false});
                this._gameState.setStopped();
            } else if (sprite instanceof Invader) {
                this._invaders.remove(sprite);
                this._spritesController.remove(sprite);
                if (this._invaders.getInvaders().size === 0) {
                    //this._gameState.set({started: false});
                    this._gameState.setStopped();
                }
            } else if (sprite instanceof Rocket) {
                this._spritesController.remove(sprite);
            }
        });

        this._spritesController.on(SpritesController.events.OVERFLY, (sprite) => {
            if (sprite instanceof Invader) {
                //this._gameState.set({started: false});
                this._gameState.setStopped();
            } else if (sprite instanceof Rocket) {
                this._spritesController.remove(sprite);
            }
        });

        this._invaders = new InvadersFleet();
        this._invaders.prepare(this._ctx);
        this._spritesController.add(this._invaders);
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

        var shipPosition = this._ship.getPosition();
        if (this._gameControls.has(ControlsState.modifiers.LEFT) && shipPosition.x >= 10) {
            shipPosition.x -= 10;
        } else if (this._gameControls.has(ControlsState.modifiers.RIGHT) && shipPosition.x <= width - 10) {
            shipPosition.x += 10;
        }
        this._ship.setPosition(shipPosition);
        this._ship.update(ctx);
        this._ship.draw(ctx);

        this._spritesController.update(ctx);
        this._spritesController.draw(ctx);
    }

    _onAction () {
        //this._gameState.set({started: false});
        this._gameState.setStopped();
    }

    _onFire() {
        if (this._lastShot < Date.now() - COOLDOWN) {
            var rocket = new Rocket();
            var shipPositon = this._ship.getPosition();
            rocket.setPosition({
                x: shipPositon.x,
                y: shipPositon.y - 40
            });
            this._spritesController.add(rocket);

            this._lastShot = Date.now();
        }
    }
}

export default PlaygroundScreen;
