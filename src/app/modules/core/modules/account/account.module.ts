import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutes } from './account.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbPopoverModule,
  NbToggleModule,
  NbRadioModule,
  NbAccordionModule,
  NbSelectModule,
  NbTooltipModule
} from '@nebular/theme';
import { ThemeModule } from 'src/app/modules/nebular/nebular.module';
import { ShareModule } from 'src/app/share/share.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskModule, IConfig } from 'ngx-mask';
// import {  } from './components';
import { AccountHomeComponent } from './pages';
import {
  AccountProfileComponent,
  AccountHistoryComponent,
  AccountPasswordComponent
} from './components';
// tslint:disable-next-line:prefer-const
let options: Partial<IConfig> | (() => Partial<IConfig>) = {};
const COMPONENTS = [
  AccountProfileComponent,
  AccountHistoryComponent,
  AccountPasswordComponent,
];
const PAGES = [
  AccountHomeComponent
];
@NgModule({
  imports: [
    CommonModule,
    AccountRoutes,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
    NbToggleModule,
    NbRadioModule,
    NbAccordionModule,
    NbSelectModule,
    NbTooltipModule,
    ThemeModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
    NgxMaskModule.forRoot(options),
    ShareModule
  ],
  declarations: [...COMPONENTS, ...PAGES]
})
export class AccountModule { }
