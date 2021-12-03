import { Component, Input, OnInit } from '@angular/core';
import { ImageType } from '../../../core/types/image.type';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss'],
})
export class PostImageComponent implements OnInit {
  @Input() imageSrc: string = '';
  @Input() link: string = '';
  @Input() type: ImageType = 'square';

  constructor() {}

  ngOnInit(): void {}
}
