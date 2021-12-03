import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
})
export class TokensComponent implements OnInit, OnChanges {
  @Input() tokens: number | string | null = 0;
  @Input() size: 'small' | 'medium' = 'small';
  @Input() showIcon = false;
  @Input() iconMargin = '';
  @Input() type: 'primary' | 'secondary' = 'secondary';
  dividedTokens: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tokens) {
      this.prepareToken();
    }
  }

  ngOnInit(): void {}

  private prepareToken() {
    this.dividedTokens = this.tokens
      ? this.tokens.toString().split('.')
      : ['0', '0000'];
  }
}
