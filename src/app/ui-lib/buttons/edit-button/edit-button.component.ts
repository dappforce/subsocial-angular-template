import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonComponent implements OnInit {
  @Input() id: string;
  @Input() handle: string;
  @Input() type: 'space' | 'profile' = 'space';

  route: string[];

  constructor() {}

  ngOnInit(): void {
    this.route =
      this.type === 'space'
        ? ['/spaces', this.id, 'edit']
        : ['/accounts', this.id, 'profile', 'edit'];
  }
}
