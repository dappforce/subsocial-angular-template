import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NamedLink } from '@subsocial/types';

@Component({
  selector: 'app-link-icons',
  templateUrl: './link-icons.component.html',
  styleUrls: ['./link-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkIconsComponent implements OnInit {
  @Input() set links(value: Array<string> | NamedLink[]) {
    this._links = value as string[];
  }

  _links: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
