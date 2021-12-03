import { ENTER, SPACE, TAB } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true,
    },
  ],
})
export class TagInputComponent
  extends BaseControlValueAccessorComponent
  implements OnInit, AfterContentInit
{
  @Input() placeholder: string = '';
  separatorKeysCodes: number[] = [ENTER, SPACE, TAB];
  tags: string[] = [];
  tagCtrl = new FormControl('');

  constructor() {
    super();
  }

  ngOnInit(): void {}

  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.onChange(this.tags);
  }

  add(tag: any) {
    this.tags.push((tag.value || '').trim());
    this.onChange(this.tags);
    this.tagCtrl.setValue(null);
  }

  ngAfterContentInit(): void {
    this.tags = this.value as string[];
  }
}
