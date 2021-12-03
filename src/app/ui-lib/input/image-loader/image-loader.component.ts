import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  @Input() imageUrl: string | undefined = '';
  @Input() type: 'round' | 'square' = 'round';

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  openFile() {
    this.fileInput.nativeElement.click();
  }

  removeImage() {
    this.imageUrl = '';
  }

  loadImage(event: any) {
    if (!event?.target?.files[0] || event.target.files[0].length == 0) {
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.imageUrl = reader?.result?.toString();
    };
  }
}
