import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export type SimpleSnackBarOption = {
  message: string;
  iconName?: string;
  isShowCloseButton?: boolean;
  duration?: number;
};

@Component({
  selector: 'app-simple-snack-bar',
  templateUrl: './simple-snack-bar.component.html',
  styleUrls: ['./simple-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSnackBarComponent implements OnInit {
  options: SimpleSnackBarOption;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SimpleSnackBarOption) {
    this.options = data;
  }

  ngOnInit(): void {}
}
