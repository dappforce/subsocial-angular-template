import {Component, Input} from '@angular/core';
import {TagSize} from "../../../core/types/tag-size.type";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() tagName = '';
  @Input() size: TagSize = 'medium';
}
