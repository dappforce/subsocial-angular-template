import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction.service';
import { environment } from '../../../../environments/environment';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageLoaderComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLoaderComponent
  extends BaseControlValueAccessorComponent
  implements OnInit
{
  @Input() imageUrl: string | undefined = '';
  @Input() type: 'round' | 'square' = 'round';

  fileCid: string;
  fileSizeLimit = environment.loadImageLimitMb;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private transaction: TransactionService,
    private cd: ChangeDetectorRef,
    private snackBar: SnackBarService
  ) {
    super();
  }

  ngOnInit(): void {}

  openFile() {
    this.fileInput.nativeElement.click();
  }

  async removeImage() {
    this.imageUrl = '';
    this.value = '';
    await this.transaction.removeContent(this.fileCid);
  }

  writeValue(obj: any) {
    super.writeValue(obj);
    obj ? (this.imageUrl = environment.ipfsUrl + obj) : null;
    this.cd.markForCheck();
  }

  async loadImage(event: any) {
    if (!event?.target?.files[0] || event.target.files[0].length == 0) {
      return;
    }
    const file = event.target.files[0];

    const mimeType = file.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (file.size > this.fileSizeLimit * 1024 * 1024) {
      this.snackBar.showErrorMessage('Image should be less than 2 MB');
      return;
    }

    this.fileCid = (await this.transaction.saveFile(file)) as string;

    if (this.fileCid) this.value = this.fileCid;

    this.imageUrl = environment.ipfsUrl + this.fileCid;

    this.cd.markForCheck();
  }
}
