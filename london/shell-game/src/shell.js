class Shell {
  constructor(node) {
    this.node = node;
  }

  transition(cb) {
    return new Promise((resolve, reject) => {
      let onTransitionEnd = () => {
        resolve();
        this.node.removeEventListener('transitionend', onTransitionEnd);
      }

      this.node.addEventListener('transitionend', onTransitionEnd);
      cb();
    });
  }

  move(order) {
    return this.transition(() => {
      this.node.dataset.order = order;
    });
  }

  fill() {
    this.node.dataset.full = true;
  }

  empty() {
    this.node.dataset.full = '';
  }

  isFull() {
    return Boolean(this.node.dataset.full);
  }

  open() {
    return this.transition(() => {
      this.node.classList.add('shell-opened');
    });
  }

  close() {
    return this.transition(() => {
      this.node.classList.remove('shell-opened');
    });
  }

  on(event, cb) {
    this.node.addEventListener(event, cb.bind(null, this));
  }
}

export default Shell;
