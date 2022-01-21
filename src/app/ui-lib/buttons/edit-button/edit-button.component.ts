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
  @Input() spaceId: string;
  @Input() handle: string;

  route: string[];

  constructor() {}

  ngOnInit(): void {
    this.route = ['/spaces', this.spaceId, 'edit'];
  }
}
