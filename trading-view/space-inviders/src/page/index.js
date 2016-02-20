import Game from '../lib/Game';
import Controls from '../lib/states/controlsState';

var container = document.getElementById('game');

var game = new Game(container);

var controls = game.getControls();

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;

window.addEventListener('keydown', function keydown(event) {
    var keycode = event.which;
    switch (keycode) {
        case KEY_LEFT:
            controls.set(Controls.modifiers.LEFT);
            break;
        case KEY_RIGHT:
            controls.set(Controls.modifiers.RIGHT);
            break;
    }
});

window.addEventListener('keyup', function keydown(event) {
    var keycode = event.which;
    switch (keycode) {
        case KEY_LEFT:
            controls.unset(Controls.modifiers.LEFT);
            break;
        case KEY_RIGHT:
            controls.unset(Controls.modifiers.RIGHT);
            break;
        case KEY_UP:
            controls.trigger(Controls.actions.FIRE);
            break;
        case KEY_SPACE:
            controls.trigger(Controls.actions.ACTION);
            break;
    }
});

game.start();
