import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

type ButtonSize = 'medium' | 'large';
type ButtonWidth = 'full' | 'static';

@Component({
  selector: 'app-tx-button',
  templateUrl: './tx-button.component.html',
  styleUrls: ['./tx-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxButtonComponent implements OnInit {
  @Input() name: string = '';
  @Input() type: 'flat' | 'stroked' = 'flat';
  @Input() size: ButtonSize = 'large';
  @Input() width: ButtonWidth = 'static';
  @Input() isSending: boolean;
  @Input() isDisabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
