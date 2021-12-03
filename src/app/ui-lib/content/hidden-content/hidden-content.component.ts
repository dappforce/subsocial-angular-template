import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hidden-content',
  templateUrl: './hidden-content.component.html',
  styleUrls: ['./hidden-content.component.scss'],
})
export class HiddenContentComponent implements OnInit {
  @Input() type: 'post' | 'space' | 'comment';

  constructor() {}

  ngOnInit(): void {}
}
