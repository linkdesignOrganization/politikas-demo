import { Routes } from '@angular/router';
import { desktopOnlyGuard } from './guards/desktop-only.guard';
import { DesktopOnlyPageComponent } from './pages/desktop-only-page/desktop-only-page';
import { HomeShellPageComponent } from './pages/home-shell-page/home-shell-page';

export const routes: Routes = [
  {
    path: 'demo-desktop',
    component: DesktopOnlyPageComponent
  },
  {
    path: '',
    canMatch: [desktopOnlyGuard],
    component: HomeShellPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
