import { Routes, RouterModule } from '@angular/router';
import { CameraHomeComponent } from './pages';

const routes: Routes = [
  { path: '', component: CameraHomeComponent },
];

export const CameraRoutes = RouterModule.forChild(routes);
