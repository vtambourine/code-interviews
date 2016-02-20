require('babel-polyfill');

import { random, sample } from 'lodash';
import { wait } from './utils';

class Game {
  static NEW_STATE = 'new';
  static GUESS_STATE = 'guess';
  static SHUFFLING_STATE = 'shuffling';

  constructor({container, banners, shells}) {
    this.container = container;
    this.banners = banners;
    this.shells = shells;
    this.secretShell = null;
    this.setState(Game.NEW_STATE);
    this.setupListeners();
  }

  setState(state) {
    switch (state) {
      case Game.NEW_STATE:
        this.setMessage('Start a new game');
        break;
      case Game.GUESS_STATE:
        this.setMessage('Choose a shell');
        break;
      case Game.SHUFFLING_STATE:
        this.setMessage('Shuffling');
        this.setOutcome();
        break;
    }
    this.state = state;
    this.container.dataset.state = state;
  }

  setMessage(message) {
    this.banners.message.innerText = message;
  }

  setOutcome(outcome) {
    if (outcome === undefined) {
      this.banners.status.innerText = '?';
    } else {
      this.banners.status.innerText = outcome
        ? 'You won'
        : 'You lose';
    }
  }

  setupListeners() {
    this.shells.forEach((shell) => {
      shell.on('click', this.handleShellClick.bind(this));
    });
  }

  start() {
    this.setState(Game.SHUFFLING_STATE);
    this.randomize();
  }

  async randomize() {
    this.shells.forEach(shell => shell.close());
    if (this.secretShell) this.secretShell.empty();

    this.secretShell = sample(this.shells);
    this.secretShell.fill();

    await wait(300);
    await this.secretShell.open();
    await wait(1000);
    await this.secretShell.close();

    await new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve()
      }, 1500);
    })

    this.shuffle();
  }

  async shuffle() {
    var shuffles = random(3, 6);
    for (let i = 0; i < shuffles; i++) {
      let [anna, bob] = sample(this.shells, 2);
      await this.switch(anna, bob);
      await wait(200);
    }

    this.setState(Game.GUESS_STATE);
  }

  async switch(anna, bob) {
    const annaOrder = anna.node.dataset.order;
    const bobOrder = bob.node.dataset.order;
    return Promise.all([
      anna.move(bobOrder),
      bob.move(annaOrder)
    ]);
  }

  async handleShellClick(shell, event) {
    if (this.state === Game.GUESS_STATE) {
      this.setOutcome(shell.isFull())
      await shell.open();
      this.setState(Game.NEW_STATE);
    }
  }
}

export default Game;
