import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

type AlignType = 'start' | 'end' | 'center' | 'normal' | 'space-between';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  @Input() set v(value: AlignType) {
    this.alignItem = value;
  }

  @Input() set h(value: AlignType) {
    this.justifyContent = value;
  }

  @Input() set margin(value: string) {
    this._margin = value;
  }

  @Input() set padding(value: string) {
    this._padding = value;
  }

  @HostBinding('style.align-items') alignItem: string | undefined;
  @HostBinding('style.justify-content') justifyContent: string | undefined;
  @HostBinding('style.margin') _margin: string | undefined;
  @HostBinding('style.padding') _padding: string | undefined;
  @HostBinding('style.display') flex = 'flex';
}
