import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() size = 40;
  @Input() jdentityValue = '';
  @Input() name: string | undefined;
  @Input() set src(value: string | undefined) {
    this.showJdentity = !value && isPlatformBrowser(this.platformId);
    this.url = environment.ipfsUrl + value;
  }

  url = '';
  showJdentity = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onImgError($event: any) {
    this.showJdentity = isPlatformBrowser(this.platformId);
  }
}
