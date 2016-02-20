class Screen {
    enter(game) {
        this._ctx = game.getContext();
        this._width = this._ctx.canvas.width;
        this._height = this._ctx.canvas.height;
    }

    leave() {}

    render() {}
}

export default Screen;
