export class ScrollProps {
  startIndex: number = 0;
  step: number;
  endIndex: number;

  public isFinish: boolean = false;

  get max() {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }
  private _max = Number.MAX_SAFE_INTEGER;

  constructor(step: number) {
    this.step = step;
    this.endIndex = step;
  }

  public next() {
    this.startIndex += this.step;
    if (this.startIndex + this.step > this.max) {
      this.endIndex = this.max;
    } else {
      this.endIndex = this.startIndex + this.step;
    }

    this.isFinish = this.startIndex > this.max;
  }
}
