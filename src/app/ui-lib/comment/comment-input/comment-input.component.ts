import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AccountService } from '../../../shared/services/account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommentInputComponent),
      multi: true,
    },
  ],
})
export class CommentInputComponent
  extends BaseControlValueAccessorComponent
  implements OnInit, AfterViewInit
{
  @Input() autofocus: boolean;
  @Input() isReply: boolean;
  @ViewChild('textarea') input: ElementRef;

  isShowPlaceholder: boolean;
  showSendButton: boolean;
  disabledButton: boolean = true;
  avatarUrl: string | undefined;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private accountService: AccountService) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.focus();
      this.isShowPlaceholder = false;
    }
  }

  focus() {
    this.input.nativeElement.focus();
  }

  ngOnInit(): void {
    if (!this.autofocus) {
      this.isShowPlaceholder = true;
    } else {
      this.showSendButton = true;
    }

    this.accountService.currentAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((account) => (this.avatarUrl = account?.avatar));
  }

  onFocus() {
    this.isShowPlaceholder = false;
    this.showSendButton = true;
  }

  onFocusOut() {
    if (!this._value) {
      this.isShowPlaceholder = true;
      this.showSendButton = false;
    }
  }

  onInputChange($event: any) {
    this._value = $event.target?.innerText.trim();
    this.disabledButton = !this._value;
    this.onChange(this._value);
    this.onTouch(this._value);
  }

  ngOnDestroy(): void {
    //check for storybook
    if (typeof this.unsubscribe$ !== 'string') {
      this.unsubscribe$?.next();
      this.unsubscribe$?.complete();
    }
  }
}
