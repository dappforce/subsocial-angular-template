import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ImageType } from '../../../core/types/image.type';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostImageComponent implements OnInit {
  @Input() set image(value: string) {
    this.imageSrc = value ? environment.ipfsUrl + value : '';
  }
  @Input() link: string = '';
  @Input() type: ImageType = 'square';

  imageSrc = '';

  constructor() {}

  ngOnInit(): void {}
}
