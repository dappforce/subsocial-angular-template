import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
  @Input() iconName: string;
  @Input() buttonSize: number = 28;
  @Input() iconSize: number = 16;

  constructor() {}

  ngOnInit(): void {}
}
