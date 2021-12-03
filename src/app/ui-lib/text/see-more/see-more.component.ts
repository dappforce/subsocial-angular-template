import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeeMoreComponent implements OnInit {
  @Input() link: string;
  @Input() type: 'link' | 'expand' = 'link';
  @Input() isAutoExpand: boolean = false;
  @Output() switch = new EventEmitter();

  routerData: {
    isAutoExpand: boolean;
  };

  isMore: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isMore = this.isAutoExpand;

    this.routerData = {
      isAutoExpand: this.isAutoExpand,
    };
  }

  onSwitch() {
    this.isMore = !this.isMore;
    this.switch.emit();
  }

  goToSpacePage() {
    this.router.navigate([this.link], { queryParams: this.routerData });
  }
}
