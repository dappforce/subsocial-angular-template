import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() userName: string;
  @Input() spaceName: string;
  @Input() createdAtTime: number;
  @Input() ownerId: string;
  @Input() spaceLink: string | undefined;
  @Input() postLink: string;

  constructor() {}

  ngOnInit(): void {}
}
