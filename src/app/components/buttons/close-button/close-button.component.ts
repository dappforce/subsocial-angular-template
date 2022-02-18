import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
