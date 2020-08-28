import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components';
import { AppGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'camera'
      },
      {
        path: 'camera',
        loadChildren: './modules/camera/camera.module#CameraModule',

      },
      {
        path: 'account',
        loadChildren: './modules/account/account.module#AccountModule',
        canLoad: [AppGuard]
      },
    ]
  },
];

export const CoreRoutes = RouterModule.forChild(routes);
