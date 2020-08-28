import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
  },
  {
    path: 'core',
    loadChildren: './modules/core/core.module#CoreModule',
  },
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
