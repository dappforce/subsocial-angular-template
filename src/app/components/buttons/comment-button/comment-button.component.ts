import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.scss'],
})
export class CommentButtonComponent implements OnInit {
  @Output() onClick = new EventEmitter();
  @Input() count: number;
  @Input() fontSize: number = 14;

  constructor() {}

  ngOnInit(): void {}
}
