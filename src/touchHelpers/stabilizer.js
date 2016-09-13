/** Created by ge on 9/12/16. */
export default class Stabilizer {
  constructor(down, level, weight, x, y, pressure, interval) {
    interval = interval || 5;
    this.follow = 1 - Math.min(0.95, Math.max(0, weight));
    this.paramTable = [];
    this.current = {x: x, y: y, pressure: pressure};
    for (let i = 0; i < level; ++i)
      this.paramTable.push({x: x, y: y, pressure: pressure});
    this.first = this.paramTable[0];
    this.last = this.paramTable[this.paramTable.length - 1];
    this.upCalled = false;
    if (down != null)
      down(x, y, pressure);
    window.setTimeout(this._move, interval);
  }

  down(x, y, pressure) {
  }

  move(x, y, pressure) {
    this.current.x = x;
    this.current.y = y;
    this.current.pressure = pressure;
  }

  up(x, y, pressure) {
    this.current.x = x;
    this.current.y = y;
    this.current.pressure = pressure;
    this.upCalled = true;
  }

  _dlerp(a, d, t) {
    return a + d * t;
  }

  _move(justCalc) {
    let curr;
    let prev;
    let dx;
    let dy;
    let dp;
    let delta = 0;
    this.first.x = this.current.x;
    this.first.y = this.current.y;
    this.first.pressure = this.current.pressure;
    for (let i = 1; i < this.paramTable.length; ++i) {
      curr = this.paramTable[i];
      prev = this.paramTable[i - 1];
      dx = prev.x - curr.x;
      dy = prev.y - curr.y;
      dp = prev.pressure - curr.pressure;
      delta += Math.abs(dx);
      delta += Math.abs(dy);
      curr.x = this._dlerp(curr.x, dx, this.follow);
      curr.y = this._dlerp(curr.y, dy, this.follow);
      curr.pressure = this._dlerp(curr.pressure, dp, this.follow);
    }
    if (justCalc)
      return delta;
    if (this.upCalled) {
      while (delta > 1) {
        move(this.last.x, this.last.y, this.last.pressure);
        delta = this._move(true);
      }
      up(this.last.x, this.last.y, this.last.pressure);
    }
    else {
      move(this.last.x, this.last.y, this.last.pressure);
      window.setTimeout(this._move, interval);
    }
  }
};
