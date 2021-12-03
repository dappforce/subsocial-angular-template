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

@NgModule({
  declarations: [
    TagComponent,
    TagInputComponent,
    TextAreaComponent,
    TextInputComponent,
    ImageLoaderComponent,
  ],
  exports: [
    TagComponent,
    TagInputComponent,
    TextAreaComponent,
    TextInputComponent,
    ImageLoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
  ],
})
export class InputModule {}
