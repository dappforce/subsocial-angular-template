import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {MainRoutingModule} from "./main-routing.module";
import {SharedModule} from "../shared/shared.module";
import {SpaceModule} from "../space/space.module";
import {PostModule} from "../post/post.module";



@NgModule({
    declarations: [
        MainComponent,
    ],
    exports: [
        MainComponent
    ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    SpaceModule,
    PostModule
  ]
})
export class MainModule { }
