import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { KeyValuePair } from '../models/key-value-pair.model';

@Component({
  template: '',
})
export class BaseControlValueAccessorComponent implements ControlValueAccessor {
  @Input() errorTexts: KeyValuePair<string>;
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
    this._value = obj;
  }

  onBlur() {
    this.onTouch();
    this.blur.emit();
  }
}
