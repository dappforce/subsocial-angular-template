import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-send-tips-button',
  templateUrl: './send-tips-button.component.html',
  styleUrls: ['./send-tips-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendTipsButtonComponent {
  @Input() width: 'full' | 'static' = 'static';
}
