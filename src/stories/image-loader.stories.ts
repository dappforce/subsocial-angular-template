import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageLoaderComponent } from '../app/ui-lib/input/image-loader/image-loader.component';
import { IconRegistryService } from '../app/shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../app/app.module';
import { APP_BASE_HREF } from '@angular/common';

export default {
  title: 'Shared/Image Loader',
  component: ImageLoaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [
        IconRegistryService,
        {
          provide: APP_INITIALIZER,
          useFactory: registryIcons,
          deps: [IconRegistryService],
          multi: true,
        },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
    }),
    componentWrapperDecorator((story) => {
      return `<div style="background-color: white; padding: 16px" class="container">
            ${story}
        </div>`;
    }),
  ],
} as Meta;

const Template: Story<ImageLoaderComponent> = (args: ImageLoaderComponent) => ({
  props: args,
});

export const ImageLoader = Template.bind({});
const component = new ImageLoaderComponent();
ImageLoader.args = {
  ...component,
  imageUrl: 'assets/avatar2.png',
};
