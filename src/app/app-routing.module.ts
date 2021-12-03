import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceComponent } from './space/space/space.component';
import { PostComponent } from './post/post/post.component';
import { EditSpaceComponent } from './space/edit-space/edit-space.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    pathMatch: 'full',
  },
  {
    path: 'spaces/:type',
    component: EditSpaceComponent,
  },
  { path: 'posts/:type', component: EditPostComponent },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: ':spaceId',
    component: SpaceComponent,
  },
  { path: ':spaceId/:slug', component: PostComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
