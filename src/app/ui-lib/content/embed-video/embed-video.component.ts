import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-embed-video',
  templateUrl: './embed-video.component.html',
  styleUrls: ['./embed-video.component.scss'],
})
export class EmbedVideoComponent implements OnInit {
  @Input() set videoUrl(value: string | undefined) {
    this._videoUrl = value;
    if (value) {
      this.videoId = this.extractVideoId(value);
    }
  }

  get videoUrl() {
    return this._videoUrl;
  }
  private _videoUrl: string | undefined;

  videoId: string | false = '';

  constructor() {}

  ngOnInit(): void {}

  private extractVideoId(url: string): string | false {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
}
