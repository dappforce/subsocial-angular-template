import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';
import { AddressComponent } from '../app/ui-lib/address/address.component';
import { AddressModule } from '../app/ui-lib/address/address.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokensComponent } from '../app/ui-lib/balance/tokens/tokens.component';
import { BalanceModule } from '../app/ui-lib/balance/balance.module';

export default {
  title: 'Shared/Tokens',
  component: TokensComponent,
  decorators: [
    moduleMetadata({
      providers: [
        IconRegistryService,
        {
          provide: APP_INITIALIZER,
          useFactory: registryIcons,
          deps: [IconRegistryService],
          multi: true,
        },
      ],
      declarations: [],
      imports: [BalanceModule, HttpClientModule],
    }),
  ],
} as Meta;

const Template: Story<TokensComponent> = (args: TokensComponent) => ({
  props: args,
});

export const Tokens = Template.bind({});
Tokens.args = {
  tokens: 0.1321,
  dividedTokens: ['0', '1321'],
};
