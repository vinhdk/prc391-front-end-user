import { Routes, RouterModule } from '@angular/router';
import { AccountHomeComponent } from './pages';

const routes: Routes = [
  { path: '', component: AccountHomeComponent },
];

export const AccountRoutes = RouterModule.forChild(routes);
