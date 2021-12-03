import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OptionButtonType } from "../../../core/types/option-button.type";

@Component({
  selector: 'app-option-button',
  templateUrl: './option-button.component.html',
  styleUrls: ['./option-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionButtonComponent implements OnInit {
  @Input() type: OptionButtonType = 'post';
  @Output() onClickViewReaction = new EventEmitter();
  @Input() isViewReaction: boolean;
  @Input() isContentHidden: boolean;

  constructor() {}

  ngOnInit(): void {}
}
