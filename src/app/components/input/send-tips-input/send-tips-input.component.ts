import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';
import { SubsocialApiService } from '../../../shared/services/subsocial-api.service';

@Component({
  selector: 'app-send-tips-input',
  templateUrl: './send-tips-input.component.html',
  styleUrls: ['./send-tips-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SendTipsInputComponent),
      multi: true,
    },
  ],
})
export class SendTipsInputComponent
  extends BaseControlValueAccessorComponent
  implements OnInit
{
  @Input() balance: string | null;
  @Input() errorKey: string | null;

  token = this.api?.metadata?.token || 'SUB';

  constructor(private api: SubsocialApiService) {
    super();
  }

  ngOnInit(): void {}
}
