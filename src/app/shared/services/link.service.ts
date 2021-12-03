import { Injectable } from '@angular/core';
import slug from 'slugify';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor() {}

  getPostLink(spaceHandle: string, title: string, id: string): string {
    return `/@${spaceHandle}/${slug(title)}-${id}`;
  }

  getPostIdFromLink(link: string | null) {
    return link ? link.trim().split('-').pop()! : '';
  }
}
