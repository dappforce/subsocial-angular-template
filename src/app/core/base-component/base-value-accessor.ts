import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  template: '',
  animations: [
    trigger('errorsAnimations', [
      transition(':enter', [
        style({ top: '-20px', opacity: 0 }),
        animate('150ms', style({ top: '0', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ top: '0', opacity: 1 }),
        animate('150ms', style({ top: '-20px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class BaseControlValueAccessorComponent implements ControlValueAccessor {
  @Input() error: string = '';
  @Output() blur = new EventEmitter();

  onChange: any = () => {};
  onTouch: any = () => {};
  protected _value: string | string[] = '';

  set value(val: string | string[]) {
    this._value = val;
    this.onChange(this._value);
    this.onTouch(this._value);
  }

  get value(): string | string[] {
    return this._value;
  }

  constructor() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.onBlur();
  }

  onBlur() {
    this.onTouch();
    this.blur.emit();
  }
}
