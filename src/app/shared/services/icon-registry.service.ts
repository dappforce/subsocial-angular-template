import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ICON_NAMES = [
    'option',
    'copy',
    'copy-white',
    'menu',
    'upvote-default',
    'downvote-default',
    'upvote-active',
    'downvote-active',
    'comment',
    'share',
    'purse',
    'qr',
    'close',
    'profile',
    'setting',
    'reply',
    'edit',
    'photo',
    'photo-white',
    'remove',
    'remove-white',
    'coin',
    'option-hor',
    'info',
    'arrow',
    'info-yellow',
  ];

  SOCIAL_ICONS_NAMES = [
    'github',
    'linkedin',
    'medium',
    'telegram',
    'twitter',
    'web',
    'youtube',
    'reddit',
    'facebook',
  ];

  init() {
    let url = 'assets/icons/';
    if (isPlatformServer(this.platformId)) {
      url = environment.domainUrl + url;
    }

    this.registryIcons(url, this.ICON_NAMES);
    this.registryIcons(url + 'links/', this.SOCIAL_ICONS_NAMES);
  }

  private registryIcons(url: string, iconNames: string[]): void {
    for (const name of iconNames) {
      this.iconRegistry.addSvgIcon(
        name + '-icon',
        this.sanitizer.bypassSecurityTrustResourceUrl(url + name + '.svg')
      );
    }
  }
}
