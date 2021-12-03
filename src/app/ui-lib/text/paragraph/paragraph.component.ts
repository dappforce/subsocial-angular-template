import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() isShowMore: boolean = false;
  @Input() link: string = '';
  @Input() marginTop: number = 0;
  @Input() marginBottom: number = 0;
  @Input() isAutoExpand: boolean;

  constructor() {}

  ngOnInit(): void {}
}
