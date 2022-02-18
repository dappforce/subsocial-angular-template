import { AbstractControl } from '@angular/forms';

export class TokenValidators {
  static tokenCheck(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== undefined && isNaN(value)) {
      return { tokens: true };
    }

    if (Number.parseFloat(value) < 0.001) {
      return { tokens: true };
    }

    return null;
  }
}
