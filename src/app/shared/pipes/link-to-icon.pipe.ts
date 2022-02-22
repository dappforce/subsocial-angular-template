import { Pipe, PipeTransform } from '@angular/core';
import { getLinkBrand } from '@subsocial/utils';

@Pipe({
  name: 'linkToIcon',
})
export class LinkToIconPipe implements PipeTransform {
  transform(link: string): string | undefined {
    return getLinkBrand(link);
  }
}
