import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../shared/services/device.service';

@Component({
  selector: 'app-edit-space',
  templateUrl: './edit-space.component.html',
  styleUrls: ['./edit-space.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSpaceComponent implements OnInit {
  @Input() type: 'edit' | 'create';

  url = '';

  editSpaceForm = new FormGroup({
    spaceName: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    tags: new FormControl([]),
  });

  constructor(
    private route: ActivatedRoute,
    public deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params.type;
    });

    if (this.type === 'edit') {
      this.url = 'assets/upload-photo.png';
      this.editSpaceForm.patchValue({
        spaceName: 'Subsocial',
        description:
          'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. \n' +
          'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
        tags: ['subsocial', 'polkadot', 'substrate'],
      });
    }
  }
}
