import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { SeeMoreComponent } from './see-more/see-more.component';
import { ExpandParagraphComponent } from './expand-paragraph/expand-paragraph.component';
import { MarkdownModule } from 'ngx-markdown';
import { CommentPostTitleComponent } from './comment-post-title/comment-post-title.component';

@NgModule({
  declarations: [
    TitleComponent,
    ParagraphComponent,
    SeeMoreComponent,
    ExpandParagraphComponent,
    CommentPostTitleComponent,
  ],
  imports: [CommonModule, RouterModule, MarkdownModule],
  exports: [
    TitleComponent,
    ParagraphComponent,
    ExpandParagraphComponent,
    SeeMoreComponent,
    CommentPostTitleComponent,
  ],
})
export class TextModule {}
