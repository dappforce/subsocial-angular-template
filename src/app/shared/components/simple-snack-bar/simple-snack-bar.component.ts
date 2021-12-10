import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

export type SimpleSnackBarOption = {
  message: string;
  iconName?: string;
  isShowCloseButton?: boolean;
  duration?: number;
  isWait?: boolean;
  className?: string;
};

@Component({
  selector: 'app-simple-snack-bar',
  templateUrl: './simple-snack-bar.component.html',
  styleUrls: ['./simple-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSnackBarComponent implements OnInit {
  options: SimpleSnackBarOption;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SimpleSnackBarOption,
    public snackBarRef: MatSnackBarRef<SimpleSnackBarComponent>
  ) {
    this.options = data;
  }

  @HostBinding('class') class: string | undefined;

  ngOnInit(): void {
    this.class = this.data.className;
  }
}
