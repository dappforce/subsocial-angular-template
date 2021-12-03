import { Pipe, PipeTransform } from '@angular/core';
import { KeyValuePair } from '../../core/models/key-value-pair.model';

@Pipe({
  name: 'linkToIcon',
})
export class LinkToIconPipe implements PipeTransform {
  transform(link: string): string {
    return this.getLinkBrand(link);
  }

  isSocialBrandLink(brand: string, link: string): boolean {
    if (!link) {
      return false;
    }

    link = link.trim().toLowerCase();
    return !!this.socialLinksRegExp[brand].find((r) => r.test(link));
  }

  getLinkBrand(link: string): string {
    for (const key in this.socialLinksRegExp) {
      if (this.isSocialBrandLink(key, link)) {
        return key;
      }
    }
    return 'web';
  }

  newSocialLinkRegExp = (brandDomain: string): RegExp => {
    return new RegExp(this.linkPrefix + brandDomain);
  };

  linkPrefix = '^(https?://)?([a-z0-9-]+.)?';

  socialLinksRegExp: KeyValuePair<RegExp[]> = {
    facebook: [
      this.newSocialLinkRegExp('facebook.com'),
      this.newSocialLinkRegExp('fb.me'),
      this.newSocialLinkRegExp('fb.com'),
      this.newSocialLinkRegExp('facebook.me'),
    ],
    twitter: [this.newSocialLinkRegExp('twitter.com')],
    medium: [this.newSocialLinkRegExp('medium.com')],
    linkedin: [
      this.newSocialLinkRegExp('linkedin.com'),
      this.newSocialLinkRegExp('linked.in'),
    ],
    github: [this.newSocialLinkRegExp('github.com')],
    reddit: [this.newSocialLinkRegExp('reddit.com')],
    youtube: [
      this.newSocialLinkRegExp('youtube.com'),
      this.newSocialLinkRegExp('youtu.be'),
    ],
    telegram: [
      this.newSocialLinkRegExp('t.me'),
      this.newSocialLinkRegExp('telegram.me'),
    ],
  };
}
