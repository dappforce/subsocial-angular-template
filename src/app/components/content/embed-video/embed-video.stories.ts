// import {
//   componentWrapperDecorator,
//   Meta,
//   moduleMetadata,
//   Story,
// } from '@storybook/angular';
// import { EmbedVideoComponent } from './embed-video.component';
// import { ContentModule } from '../content.module';
//
// export default {
//   title: 'Content/Embed Video',
//   component: EmbedVideoComponent,
//   decorators: [
//     moduleMetadata({
//       imports: [ContentModule],
//       declarations: [],
//       providers: [],
//     }),
//     componentWrapperDecorator((story) => {
//       return `
//          <div class="sb-container">
//             ${story}
//         </div>`;
//     }),
//   ],
// } as Meta;
//
// const Template: Story<EmbedVideoComponent> = (args: EmbedVideoComponent) => ({
//   component: EmbedVideoComponent,
//   props: args,
// });
//
// export const EmbedVideo: Story<EmbedVideoComponent> = Template.bind({});
// EmbedVideo.args = {
//   videoUrl: 'https://www.youtube.com/watch?v=yHGoavORSPE',
//   videoId: 'yHGoavORSPE',
// };
