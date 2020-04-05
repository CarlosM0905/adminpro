import { NgModule } from "@angular/core";
// ngFor, ngIf, pipes
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        BreadcrumbsComponent,
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        BreadcrumbsComponent,
    ],
    imports:[
        RouterModule,
        CommonModule
    ]
})

export class SharedModule{}