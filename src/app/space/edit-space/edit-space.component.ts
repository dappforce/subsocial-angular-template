import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseTxComponent } from '../../core/base-component/base-tx.component';
import { SubmittableResult } from '@polkadot/api';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { SpaceService } from '../services/space.service';
import { SpaceFacade } from '../../state/space/space.facade';

type EditSpaceFormErrors = {
  name: string;
};

@Component({
  selector: 'app-edit-space',
  templateUrl: './edit-space.component.html',
  styleUrls: ['./edit-space.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSpaceComponent extends BaseTxComponent implements OnInit {
  type: 'edit' | 'new';
  url = '';

  editSpaceForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    about: new FormControl(''),
    tags: new FormControl([]),
  });

  errors: EditSpaceFormErrors = {
    name: '',
  };

  private spaceId: string | undefined;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService,
    private spaceFacade: SpaceFacade
  ) {
    super(transaction, account, cd);
  }

  async ngOnInit() {
    const { type } = this.route.snapshot.params;
    this.type = type;

    await this.handleEditType();
  }

  onFailed(result: SubmittableResult | null): void {}

  async onSuccess(result: SubmittableResult) {
    if (this.type === 'edit') {
      this.spaceFacade.loadSpace(this.spaceId!);
    } else {
      const ids = this.getNewIdsFromEvent(result);
      if (ids?.length > 0) {
        this.spaceId = ids[0];
        await this.spaceService.getMyOwnSpaceIds();
      }
    }

    await this.router.navigate([`/${this.spaceId}`]);
  }

  validate(): boolean {
    return this.editSpaceForm.valid;
  }

  async onEditSpace() {
    this.checkErrors();

    const isEdit = this.type === 'edit';

    const pallet = PALLETS.spaces;
    const method = isEdit ? METHODS.updateSpace : METHODS.createSpace;

    const { about, name, tags, image } = this.editSpaceForm.value;

    this.contentCid = await this.saveContent({
      about,
      image,
      name,
      tags,
      links: [],
      email: '',
    });

    if (!this.contentCid) return;

    let params: any[];

    if (!isEdit) {
      params = [null, null, { IPFS: this.contentCid }, null];
    } else {
      params = [this.spaceId, { content: { IPFS: this.contentCid } }];
    }

    await this.initExtrinsic({ pallet, params, method });

    await this.sentTransaction();
  }

  private async handleEditType() {
    const { spaceId } = this.route.snapshot.params;

    if (this.type === 'edit' && spaceId) {
      this.spaceId = spaceId;
      this.spaceFacade.loadSpace(spaceId);
      const space = await this.spaceFacade.getSpaceOnce(spaceId).toPromise();

      this.editSpaceForm.patchValue({
        image: space?.image,
        name: space?.name,
        about: space?.about,
        tags: space?.tags,
      });
    }
  }

  private checkErrors() {
    const { name } = this.editSpaceForm.controls;

    this.errors.name = name.errors?.['required']
      ? 'Space name is required'
      : '';
  }

  resetForm() {
    this.editSpaceForm.reset();
  }
}
