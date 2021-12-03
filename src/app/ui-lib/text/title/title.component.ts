import { Component, Input, OnInit } from '@angular/core';
import { TitleSizeType } from '../../../core/types/title.type';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() type: TitleSizeType = 'medium';
  @Input() link: string = '';

  constructor() {}

  ngOnInit(): void {}
}
