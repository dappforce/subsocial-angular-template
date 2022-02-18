import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyButtonComponent {
  @Input() isShowLabel: boolean = false;
  @Output() click = new EventEmitter();
  @Input() fontSize = 14;
  @Input() bold: boolean;

  onClick(event: any) {
    event.stopPropagation();
    this.click.emit();
  }
}
