import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { VoteButtonComponent } from '../../../core/base-component/vote-button.component';

@Component({
  selector: 'app-downvote-button',
  templateUrl: './downvote-button.component.html',
  styleUrls: ['./downvote-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownvoteButtonComponent extends VoteButtonComponent {}
