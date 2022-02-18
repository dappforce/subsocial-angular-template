import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-embed-video',
  templateUrl: './embed-video.component.html',
  styleUrls: ['./embed-video.component.scss'],
})
export class EmbedVideoComponent implements OnInit, OnChanges {
  @Input() videoUrl: string | undefined;
  videoId: string | false = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.videoUrl && changes.videoUrl.currentValue) {
      this.videoId = this.extractVideoId(changes.videoUrl.currentValue);
    }
  }

  ngOnInit(): void {}

  private extractVideoId(url: string): string | false {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
}
