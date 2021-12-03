import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
})
export class SendButtonComponent implements OnInit {
  @Input() isDisabled: boolean;
  @Output() onSendBtnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
