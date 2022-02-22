import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdblockConflictModalDialogComponent } from '../../../components/modal-dialogs/adblock-conflict-modal-dialog/adblock-conflict-modal-dialog.component';

@Component({
  selector: 'app-adblock-detect',
  templateUrl: './adblock-detect.component.html',
  styleUrls: ['./adblock-detect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdblockDetectComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private doc: any,
    private renderer: Renderer2,
    private el: ElementRef,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const fakeAd = this.renderer.createElement('div');
      this.renderer.addClass(fakeAd, 'banner_ads');
      this.renderer.setStyle(fakeAd, 'height', '1px');
      this.renderer.appendChild(this.doc.body, fakeAd);

      if (fakeAd.offsetHeight === 0) {
        this.dialog.open(AdblockConflictModalDialogComponent, {
          // disableClose: true,
          minHeight: '300px',
          width: '432px',
        });
      }
    }
  }
}
