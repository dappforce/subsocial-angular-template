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

@NgModule({
  declarations: [SpaceItemComponent, SpaceInfoComponent],
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
  ],
  exports: [SpaceInfoComponent, SpaceItemComponent],
})
export class SpaceUiModule {}
