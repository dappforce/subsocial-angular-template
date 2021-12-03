import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-expand-paragraph',
  templateUrl: './expand-paragraph.component.html',
  styleUrls: ['./expand-paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandParagraphComponent {
  @Input() expandedText: string;
  @Input() text: string;
  @Input() isMore: boolean = true;
}
