import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-space-button',
  templateUrl: './create-space-button.component.html',
  styleUrls: ['./create-space-button.component.scss'],
})
export class CreateSpaceButtonComponent {
  @Input() width: 'full' | 'static' = 'static';
  @Input() color: 'primary' | 'gray' = 'primary';
  @Input() type: 'create' | 'edit' = 'create';
  @Input() spaceId: string;

  className: string;
  constructor(private router: Router) {}

  get isCreate() {
    return this.type === 'create';
  }

  onClick() {
    if (this.isCreate) {
      this.router.navigate(['/spaces', 'create']);
    } else {
      this.router.navigate(['/spaces', this.spaceId, 'edit']);
    }
  }
}
