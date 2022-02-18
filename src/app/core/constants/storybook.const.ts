import { IconRegistryService } from '../../shared/services/icon-registry.service';
import { APP_INITIALIZER } from '@angular/core';
import { registryIcons } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from '../../store/state';
import { DeviceService } from '../../shared/services/device.service';

export const BaseRef = { provide: APP_BASE_HREF, useValue: '/' };

export const SbTemplateId = '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD';

function deviceRegistry(service: DeviceService) {
  return () => service.init();
}

export const IconRegistryProviders = [
  IconRegistryService,
  {
    provide: APP_INITIALIZER,
    useFactory: registryIcons,
    deps: [IconRegistryService],
    multi: true,
  },
  BaseRef,
];

export const SbDeviceRegistry = [
  DeviceService,
  {
    provide: APP_INITIALIZER,
    useFactory: deviceRegistry,
    deps: [DeviceService],
    multi: true,
  },
];

export const SbRouterModule = RouterModule.forRoot([], { useHash: true });

export const SbStoreModules = [
  StoreModule.forRoot(appReducers, {}),
  EffectsModule.forRoot([]),
];

export const DISABLE_ARG = {
  control: { disable: true },
};

export const ProfileTemplate = {
  id: 'HhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
  followersCount: 1,
  followingAccountsCount: 3,
  followingSpacesCount: 9,
  about: 'Test',
  avatar: 'HhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
  name: 'Subsocial User',
  summary: 'Test',
  isShowMore: false,
};

export const PostCommentTemplate = {
  id: '1002',
  ownerId: '',
  ownerImageUrl: '',
  spaceName: 'Space',
  title: '',
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  imageUrl: '',
  createdAtTime: 1641808542001,
  repliesCount: 0,
  hiddenRepliesCount: 0,
  visibleRepliesCount: 0,
  sharesCount: 0,
  upvotesCount: 3,
  downvotesCount: 0,
  isSharedPost: false,
  isComment: true,
  isShowMore: false,
  ownerName: 'Subsocial user',
  postLink: '/1001/comment-post-210',
  hidden: false,
  spaceHidden: false,
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  tags: [],
  spaceId: '1001',
  spaceLink: '/1001',
};

export const PostTemplate = {
  id: '1001',
  ownerId: '',
  ownerImageUrl: '',
  spaceName: 'Subsocial Space',
  title: 'Lorem Ipsum is simply dummy text of the printing ',
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  imageUrl: '',
  createdAtTime: 1641808542001,
  repliesCount: 0,
  hiddenRepliesCount: 0,
  visibleRepliesCount: 0,
  sharesCount: 0,
  upvotesCount: 3,
  downvotesCount: 0,
  isSharedPost: false,
  isComment: true,
  isShowMore: false,
  ownerName: 'Subsocial user',
  postLink: '/1001/comment-post-210',
  hidden: false,
  spaceHidden: false,
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  tags: [],
  spaceId: '1001',
  spaceLink: '/1001',
};

export const SharedPostTemplate = {
  id: '1002',
  ownerId: '',
  ownerImageUrl: '',
  spaceName: 'Subsocial Space',
  title: '',
  summary:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  imageUrl: '',
  createdAtTime: 1641808542001,
  repliesCount: 0,
  hiddenRepliesCount: 0,
  visibleRepliesCount: 0,
  sharesCount: 0,
  upvotesCount: 3,
  downvotesCount: 0,
  isSharedPost: true,
  isComment: true,
  isShowMore: false,
  ownerName: 'Subsocial user',
  postLink: '/1001/comment-post-210',
  hidden: false,
  spaceHidden: false,
  body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  tags: [],
  spaceId: '1002',
  spaceLink: '/1002',
};

export const SpaceTemplate = {
  id: '1001',
  ownerId: '3t8GGfcxxXiTUmGiTKp2jS611wucGs4K7zvr2UmXrawoWYLD',
  isHidden: false,
  name: 'Space name',
  image: '',
  followersCount: 4,
  postsCount: 2,
  spaceLink: '/1001',
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  about:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  isShowMore: true,
  tags: ['subsocial', 'tags'],
  links: [],
};

export const imageUrl =
  'https://app.subsocial.network/ipfs/ipfs/QmZfJmzeEQfp1WW7AUGkNSW6AL8ibdvoEyhRZubc3sVL6L';
