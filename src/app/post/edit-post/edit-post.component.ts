import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabLinkData } from '../../core/models/tab-link-data.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseTxComponent } from '../../core/base-component/base-tx.component';
import { TransactionService } from '../../shared/services/transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { SubmittableResult } from '@polkadot/api';
import { METHODS, PALLETS } from '../../core/constants/query.const';
import { PostContent } from '@subsocial/types';
import { PostService } from '../services/post.service';
import { Post } from '../../core/models/post/post-list-item.model';
import { Location } from '@angular/common';
import { PostFacade } from '../../state/post/post.facade';
import { SignInModalService } from '../../ui-lib/modal-dialogs/services/sign-in-modal.service';
import { StorageService } from '../../shared/services/storage.service';

type PostFormErrors = {
  body: string;
  link: string;
};

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent extends BaseTxComponent implements OnInit {
  type: 'edit' | 'new';
  tabs: TabLinkData[] = [{ tabName: 'article' }, { tabName: 'video' }];
  activeTab: TabLinkData = this.tabs[0];
  videoUrl = '';

  initialSpaceId: string | undefined;
  postId: string;
  isBodyRequired = this.activeTab.tabName === 'article';
  postFormErrors: PostFormErrors = {
    body: '',
    link: '',
  };

  postForm = new FormGroup({
    spaceId: new FormControl(''),
    title: new FormControl(''),
    body: new FormControl('', { validators: Validators.required }),
    tags: new FormControl([]),
    link: new FormControl(''),
    image: new FormControl(''),
  });

  get isActiveArticle() {
    return this.activeTab.tabName === 'article';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    private postService: PostService,
    private location: Location,
    private postFacade: PostFacade,
    public signIn: SignInModalService,
    private storage: StorageService
  ) {
    super(transaction, account, signIn, cd);
  }

  async ngOnInit() {
    const { type } = this.route.snapshot.params;
    this.initialSpaceId = this.route.snapshot.queryParams['spaceId'];
    this.type = type;

    await this.handleEditType();
  }

  setActiveTab(tab: TabLinkData) {
    this.resetErrors();
    this.activeTab = tab;
    this.isBodyRequired = this.isActiveArticle;

    if (this.isActiveArticle) {
      this.postForm.controls['link'].clearValidators();
      this.postForm.controls['body'].addValidators(Validators.required);
    } else {
      this.postForm.controls['body'].clearValidators();
      this.postForm.controls['link'].addValidators(Validators.required);
    }
    this.postForm.controls['link'].updateValueAndValidity();
    this.postForm.controls['body'].updateValueAndValidity();
  }

  onVideoUrlBlur() {
    this.videoUrl = this.postForm.value.link;
  }

  onFailed(result: SubmittableResult | null): void {
    console.log(result?.toHuman());
  }

  async onSuccess(result: SubmittableResult) {
    let newPost: Post | null = null;
    if (this.type === 'edit') {
      newPost = await this.postFacade.fetchPost(this.postId).toPromise();
    } else {
      const ids = this.getNewIdsFromEvent(result);
      if (ids?.length > 0) {
        this.postId = ids[0];
        newPost = await this.postFacade.fetchPost(this.postId).toPromise();
      }
    }

    newPost
      ? await this.router.navigate(['/' + newPost.postLink])
      : console.error('Post not found');
  }

  validate(): boolean {
    const isValid = this.postForm.valid;

    if (!isValid) {
      this.transaction.showErrorMessage('Form is invalid');
    }

    return isValid;
  }

  async onEditPost() {
    this.checkErrors();
    const isEdit = this.type === 'edit';

    const pallet = PALLETS.posts;
    const method = isEdit ? METHODS.updatePost : METHODS.createPost;

    const { spaceId, title, body, tags, link, image } = this.postForm.value;

    const content: PostContent = {
      title,
      tags,
      body,
      link: '',
      image: '',
      canonical: '',
    };

    if (this.isActiveArticle) {
      content.image = image;
      content.link = '';
    } else {
      content.link = link;
      content.image = '';
    }

    this.contentCid = await this.saveContent(content);

    if (!this.contentCid) return;

    let params: any[];

    if (isEdit) {
      const update = {
        spaceId: null,
        content: {
          IPFS: this.contentCid,
        },
        hidden: null,
      };

      params = [this.postId, update];
    } else {
      this.storage.setLastSpaceId(spaceId);
      params = [spaceId, { RegularPost: null }, { IPFS: this.contentCid }];
    }

    await this.initExtrinsic({ pallet, params, method });

    await this.sentTransaction();
  }

  async handleEditType() {
    const { postId } = this.route.snapshot.params;

    if (this.type !== 'edit' || !postId) return;

    this.postId = postId;

    const {
      title,
      body,
      tags,
      link,
      imageUrl: image,
    } = await this.postFacade.fetchPost(postId).toPromise();

    this.postForm.patchValue({
      title,
      body,
      tags,
      link,
      image,
    });
  }
  resetForm() {
    if (this.type === 'edit') {
      this.location.back();
    } else {
      this.postForm.reset();
    }
  }

  private resetErrors() {
    this.postFormErrors = {
      body: '',
      link: '',
    };
  }

  private checkErrors() {
    const { body, link } = this.postForm.controls;

    this.postFormErrors.body = body.errors?.['required']
      ? 'Post body is required'
      : '';

    this.postFormErrors.link = link.errors?.['required']
      ? 'Video url is required'
      : '';
  }
}
