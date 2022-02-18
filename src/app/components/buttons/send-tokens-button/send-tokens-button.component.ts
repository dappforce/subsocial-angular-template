import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-tokens-button',
  templateUrl: './send-tokens-button.component.html',
  styleUrls: ['./send-tokens-button.component.scss'],
})
export class SendTokensButtonComponent implements OnInit {
  @Input() width: 'full' | 'static' = 'static';

  constructor() {}

  ngOnInit(): void {}
}
