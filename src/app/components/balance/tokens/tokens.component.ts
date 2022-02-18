import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SubsocialApiService } from '../../../shared/services/subsocial-api.service';

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
  tokenName: string;

  constructor(public api: SubsocialApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tokens) {
      this.prepareToken();
    }
  }

  ngOnInit(): void {
    this.tokenName = this.api?.metadata?.token || 'SUB';
  }

  private prepareToken() {
    this.dividedTokens = this.tokens
      ? this.tokens.toString().split('.')
      : ['0', '0000'];
  }
}
