import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedVideoComponent } from './embed-video/embed-video.component';
import { PostImageComponent } from './post-image/post-image.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { RouterModule } from '@angular/router';
import { HiddenContentComponent } from './hidden-content/hidden-content.component';
import { ContainersModule } from '../containers/containers.module';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NoContentComponent } from './no-content/no-content.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    EmbedVideoComponent,
    PostImageComponent,
    HiddenContentComponent,
    NoContentComponent,
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    RouterModule,
    ContainersModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
  ],
  exports: [
    EmbedVideoComponent,
    PostImageComponent,
    HiddenContentComponent,
    NoContentComponent,
  ],
})
export class ContentModule {}
