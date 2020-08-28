import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutes } from './core.routing';
import { LayoutComponent } from './components';
import { NbMenuModule } from '@nebular/theme';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutes,
    ShareModule,
    NbMenuModule
  ],
  declarations: [LayoutComponent]
})
export class CoreModule { }
