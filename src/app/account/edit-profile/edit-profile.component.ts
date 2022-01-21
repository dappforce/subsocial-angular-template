import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../shared/services/device.service';
import { BaseTxComponent } from '../../core/base-component/base-tx.component';
import { SubmittableResult } from '@polkadot/api';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProfileFacade } from '../../state/profile/profile.facade';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

type Type = 'edit' | 'new';

@Component({
  selector: 'app-edit-space',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent
  extends BaseTxComponent
  implements OnInit, OnDestroy
{
  type: Type;
  url = '';

  editProfileForm = new FormGroup({
    avatar: new FormControl(''),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    about: new FormControl(''),
  });

  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public deviceService: DeviceService,
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private profileFacade: ProfileFacade
  ) {
    super(transaction, account, cd);
  }

  titleKey = 'general.new';
  hasPermission$ = new BehaviorSubject<boolean>(true);
  unsubscribe$ = new Subject();

  get isNew() {
    return this.type === 'edit';
  }

  async ngOnInit() {
    combineLatest([this.route.params, this.account.currentAccount$])
      .pipe(
        filter(([, account]) => !!account),
        tap(([{ userId }, account]) => {
          this.userId = userId;
          this.hasPermission$.next(account?.id === userId);
        }),
        switchMap(([{ userId }]) => this.profileFacade.getProfile(userId)),
        map((profile) => {
          if (profile?.name) {
            this.editProfileForm.patchValue({ ...profile });
            this.type = 'edit';
          } else {
            this.type = 'new';
          }
          this.titleKey = 'general.' + this.type;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((_) => null);
  }

  onFailed(result: SubmittableResult | null): void {}

  async onSuccess(result: SubmittableResult) {
    await this.router.navigate(['/accounts', this.userId]);
  }

  validate(): boolean {
    return this.editProfileForm.valid;
  }

  async onEditProfile() {
    const pallet = PALLETS.profiles;
    const method = this.isNew ? METHODS.createProfile : METHODS.updateProfile;

    const { about, name, avatar } = this.editProfileForm.value;

    this.contentCid = await this.saveContent({
      about,
      avatar,
      name,
    });

    if (!this.contentCid) return;

    const params = this.isNew
      ? [{ IPFS: this.contentCid }]
      : [{ content: { IPFS: this.contentCid } }];

    await this.initExtrinsic({ pallet, params, method });

    await this.sentTransaction();
  }

  resetForm() {
    if (this.isNew) {
      this.editProfileForm.patchValue({});
    } else {
      this.router.navigate(['/accounts', this.userId]);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
