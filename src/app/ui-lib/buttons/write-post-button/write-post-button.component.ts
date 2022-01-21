import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-post-button',
  templateUrl: './write-post-button.component.html',
  styleUrls: ['./write-post-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WritePostButtonComponent {
  @Input() spaceId: string;
  @Input() width: 'full' | 'static' = 'static';
  @Input() set disabled(value: boolean) {
    this.className = value ? 'disabled' : '';
    this._disabled = value;
  }

  constructor(private router: Router) {}

  get disabled() {
    return this._disabled;
  }

  className = '';
  private _disabled: boolean;

  onWritePost() {
    if (!this.disabled) {
      this.router.navigate(['posts', 'new'], {
        queryParams: { spaceId: this.spaceId },
      });
    }
  }
}
