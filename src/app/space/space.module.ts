import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceListComponent } from './space-list/space-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SpaceComponent } from './space/space.component';
import { EditSpaceComponent } from './edit-space/edit-space.component';
import { SpaceProfileComponent } from './space-profile/space-profile.component';
import { PostModule } from '../post/post.module';
import { MarkdownModule } from 'ngx-markdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ButtonsModule } from '../ui-lib/buttons/buttons.module';
import { SpaceUiModule } from '../ui-lib/space-ui/space-ui.module';
import { InputModule } from '../ui-lib/input/input.module';
import { ContainersModule } from '../ui-lib/containers/containers.module';
import { TextModule } from '../ui-lib/text/text.module';
import { ContentModule } from '../ui-lib/content/content.module';

@NgModule({
  declarations: [
    SpaceListComponent,
    SpaceComponent,
    EditSpaceComponent,
    SpaceProfileComponent,
  ],
  imports: [
    CommonModule,
    SpaceRoutingModule,
    HttpClientModule,
    SharedModule,
    PostModule,
    InfiniteScrollModule,
    MarkdownModule.forRoot(),
    ButtonsModule,
    SpaceUiModule,
    InputModule,
    ContainersModule,
    TextModule,
    ContentModule,
  ],
  exports: [SpaceListComponent],
})
export class SpaceModule {}
