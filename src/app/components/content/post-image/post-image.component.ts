import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ImageType } from '../../../core/types/image.type';
import { environment } from '../../../../environments/environment';
import { KeyValuePair } from '../../../core/models/key-value-pair.model';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostImageComponent implements OnInit {
  @Input() set image(value: string) {
    this.imageSrc = value ? environment.ipfsUrl + value : '';
    this.style = {
      backgroundImage: 'url(' + this.imageSrc + ')',
    };
  }
  @Input() link: string = '';
  @Input() type: ImageType = 'square';

  imageSrc = '';

  constructor() {}

  style: KeyValuePair<string>;

  ngOnInit(): void {}
}
