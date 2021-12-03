import { EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../core/models/user-info.model';
import { UserListType } from '../../../core/types/user-list.type';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vote-user-list-item',
  templateUrl: './vote-user-list-item.component.html',
  styleUrls: ['./vote-user-list-item.component.scss'],
})
export class VoteUserListItemComponent implements OnInit {
  @Input() userInfo: UserInfo;
  @Input() type: UserListType = 'follow';
  @Output() onClick = new EventEmitter();
  @Input() isHover: boolean;
  showCopyButton = false;
  avatarBaseUrl = environment.ipfsUrl;

  @HostListener('mouseover') onMouseHover() {
    this.showCopyButton = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showCopyButton = false;
  }

  constructor(public dialogRef: MatDialog) {}

  ngOnInit(): void {}

  follow() {}

  unFollow() {}
}
