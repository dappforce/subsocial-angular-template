import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent {
  @Input() set height(value: string) {
    this._height = value;
  }

  @HostBinding('style.height') _height: string;
}
