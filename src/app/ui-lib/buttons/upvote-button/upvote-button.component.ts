import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { VoteButtonComponent } from '../../../core/base-component/vote-button.component';

@Component({
  selector: 'app-upvote-button',
  templateUrl: './upvote-button.component.html',
  styleUrls: ['./upvote-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpvoteButtonComponent extends VoteButtonComponent {}
