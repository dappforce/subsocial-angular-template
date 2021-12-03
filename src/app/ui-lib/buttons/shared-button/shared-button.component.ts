import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedButtonComponent {
  @Input() isShowLabel: boolean = false;
}
