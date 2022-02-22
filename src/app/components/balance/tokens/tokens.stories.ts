import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryProviders } from '../../../core/constants/storybook.const';
import { BalanceModule } from '../balance.module';
import { TokensComponent } from './tokens.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export default {
  title: 'Shared/Tokens',
  component: TokensComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, BalanceModule, MatSnackBarModule],
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
