import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-write-post-button',
  templateUrl: './write-post-button.component.html',
  styleUrls: ['./write-post-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritePostButtonComponent {
  @Input() width: 'full' | 'static' = 'static';
}
