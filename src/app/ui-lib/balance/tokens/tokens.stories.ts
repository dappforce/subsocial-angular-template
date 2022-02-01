import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { BalanceModule } from '../balance.module';
import { TokensComponent } from './tokens.component';

export default {
  title: 'Shared/Tokens',
  component: TokensComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslocoRootModule, HttpClientModule, BalanceModule],
      declarations: [],
      providers: [...IconRegistryProviders],
    }),
  ],
} as Meta;

const Template: Story<TokensComponent> = (args: TokensComponent) => ({
  component: TokensComponent,
  props: args,
});

export const Tokens: Story<TokensComponent> = Template.bind({});
Tokens.args = {
  tokens: 12.0123,
  dividedTokens: ['12', '0123'],
  showIcon: true,
};
