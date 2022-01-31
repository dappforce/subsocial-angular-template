import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TextInputComponent } from './text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { MdeEditorComponent } from './mde-editor/mde-editor.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SendTipsInputComponent } from './send-tips-input/send-tips-input.component';
import { ContainersModule } from '../containers/containers.module';

@NgModule({
  declarations: [
    TagComponent,
    TagInputComponent,
    TextAreaComponent,
    TextInputComponent,
    ImageLoaderComponent,
    MdeEditorComponent,
    SendTipsInputComponent,
  ],
  exports: [
    TagComponent,
    TagInputComponent,
    TextAreaComponent,
    TextInputComponent,
    ImageLoaderComponent,
    MdeEditorComponent,
    SendTipsInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    TranslocoModule,
    ContainersModule,
  ],
})
export class InputModule {}
