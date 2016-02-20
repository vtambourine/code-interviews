import Game from './game';
import Shell from './shell';

document.addEventListener('DOMContentLoaded', () => {
  const shells = Array.prototype.map.call(
    document.getElementsByClassName('shell'),
    node => new Shell(node)
  );

  const game = new Game({
    container: document.getElementById('game'),
    banners: {
      message: document.getElementById('message'),
      status: document.getElementById('status')
    },
    shells
  });

  document.getElementById('start').addEventListener('click', game.start.bind(game));

  window.game = game;
});
