import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from '../app/shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { SharedModule } from '../app/shared/shared.module';

// export default {
//   title: 'Shared/Header',
//   component: HeaderComponent,
//   argTypes: {},
//   decorators: [
//     moduleMetadata({
//       providers: [
//         IconRegistryService,
//         {
//           provide: APP_INITIALIZER,
//           useFactory: registryIcons,
//           deps: [IconRegistryService],
//           multi: true,
//         },
//       ],
//       imports: [
//         SharedModule,
//         CommonModule,
//         RouterModule.forRoot([], { useHash: true }),
//         HttpClientModule,
//       ],
//     }),
//   ],
// } as Meta;
//
// const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
//   props: args,
// });
//
// export const Header = Template.bind({});
// Header.args = {
//   appName: 'Subsocial',
// };
