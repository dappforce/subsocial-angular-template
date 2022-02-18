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
import { ButtonsModule } from '../components/buttons/buttons.module';
import { SpaceUiModule } from '../components/space-ui/space-ui.module';
import { InputModule } from '../components/input/input.module';
import { ContainersModule } from '../components/containers/containers.module';
import { TextModule } from '../components/text/text.module';
import { ContentModule } from '../components/content/content.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MenuModule } from '../components/menu/menu.module';
import { I18NextModule } from 'angular-i18next';

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
    DirectivesModule,
    MenuModule,
    I18NextModule,
  ],
  exports: [SpaceListComponent],
})
export class SpaceModule {}
