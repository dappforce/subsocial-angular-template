export class ScrollProps {
  startIndex: number = 0;
  limit: number;
  endIndex: number;

  public isFinish: boolean = false;

  get max() {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }
  private _max = Number.MAX_SAFE_INTEGER;

  constructor(limit: number) {
    this.limit = limit;
    this.endIndex = limit;
  }

  public next() {
    this.startIndex += this.limit;
    if (this.startIndex + this.limit > this.max) {
      this.endIndex = this.max;
    } else {
      this.endIndex = this.startIndex + this.limit;
    }

    this.isFinish = this.startIndex > this.max;
  }
}
