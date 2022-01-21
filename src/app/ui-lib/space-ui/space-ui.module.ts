import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceItemComponent } from './space-item/space-item.component';
import { TextModule } from '../text/text.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { InputModule } from '../input/input.module';
import { SpaceInfoComponent } from './space-info/space-info.component';
import { AvatarModule } from '../avatar/avatar.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { ContainersModule } from '../containers/containers.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { ContentModule } from '../content/content.module';
import { MenuModule } from '../menu/menu.module';
import { SpaceSelectComponent } from './space-select/space-select.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SpaceItemComponent, SpaceInfoComponent, SpaceSelectComponent],
  imports: [
    CommonModule,
    TextModule,
    ButtonsModule,
    InputModule,
    AvatarModule,
    PipesModule,
    MatCardModule,
    ContainersModule,
    DirectivesModule,
    ContentModule,
    MenuModule,
    MatSelectModule,
    TranslocoModule,
  ],
  exports: [SpaceInfoComponent, SpaceItemComponent, SpaceSelectComponent],
})
export class SpaceUiModule {}
