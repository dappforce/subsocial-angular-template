import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-comment-post-title',
  templateUrl: './comment-post-title.component.html',
  styleUrls: ['./comment-post-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentPostTitleComponent implements OnInit {
  @Input() postTitle: string | undefined = '';
  @Input() link: string | undefined = '';

  constructor() {}

  ngOnInit(): void {}
}
