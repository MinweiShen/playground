type Callback = (x: number, y: number) => any;

class Mover {
  private onDoneCb: Callback = (x, y) => {};
  private onMoveCb: Callback = (x, y) => {};
  private activated: boolean = false;

  constructor(private originX: number = 0, private originY: number = 0) {}

  setOrigin(x: number, y: number) {
    this.originX = x;
    this.originY = y;
    return this;
  }

  activate() {
    this.activated = true;
    console.log('activated', this.activated);
    return this;
  }

  onDone(fn: Callback) {
    this.onDoneCb = fn;
    return this;
  }

  onMove(fn: Callback) {
    this.onMoveCb = fn;
    return this;
  }

  done(x: number, y: number) {
    this.activated = false;
    this.onDoneCb(x - this.originX, y - this.originY);
    return this;
  }

  move(x: number, y: number) {
    console.log('move', this.activated);
    this.activated && this.onMoveCb(x - this.originX, y - this.originY);
    return this;
  }
}

export default Mover;