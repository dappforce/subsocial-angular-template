import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabLinkData } from '../../core/models/tab-link-data.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  type: 'edit' | 'create';
  tabs: TabLinkData[] = [{ tabName: 'article' }, { tabName: 'video' }];
  activeTab: TabLinkData = this.tabs[0];
  videoUrl = '';

  postForm = new FormGroup({
    postTitle: new FormControl(''),
    postBody: new FormControl(''),
    tags: new FormControl([]),
    videoUrl: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params.type;
    });
  }

  setActiveTab(tab: TabLinkData) {
    this.activeTab = tab;
  }

  onVideoUrlBlur() {
    this.videoUrl = this.postForm.value.videoUrl;
  }
}
