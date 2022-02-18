import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  host: { class: 'text-area' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent
  extends BaseControlValueAccessorComponent
  implements OnInit, AfterViewInit
{
  @Input() label = '';
  @Input() isRequired = false;
  @Input() set initHeight(value: number) {
    this._initHeight = value;
    if (this.textArea) {
      this.textArea.nativeElement.style.minHeight = this.initHeight + 'px';
    }
  }

  get initHeight(): number {
    return this._initHeight;
  }

  @ViewChild('textarea') textArea: ElementRef<HTMLTextAreaElement>;

  private _initHeight = 100;
  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.textArea.nativeElement.style.minHeight = this.initHeight + 'px';
    this.resizeElement();
  }

  private resizeElement() {
    this.textArea.nativeElement.style.height = 'auto';
    this.textArea.nativeElement.style.height =
      this.textArea.nativeElement.scrollHeight + 'px';
  }

  changeText() {
    this.resizeElement();
  }
}
