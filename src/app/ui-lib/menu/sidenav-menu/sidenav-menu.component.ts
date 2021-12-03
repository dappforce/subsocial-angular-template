import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavMenuComponent implements OnInit {
  @Input() profileId: string;

  constructor(private snackBarService: SnackBarService) {}

  ngOnInit(): void {}

  onSettings() {
    this.snackBarService.openSimpleSnackBar({
      message: 'Settings must be implemented',
      iconName: 'info-icon',
      isShowCloseButton: true,
      duration: 6000,
    });
  }
}
