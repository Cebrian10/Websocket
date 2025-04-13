import { Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./views/clientes/clientes.routes').then((m) => m.ClientesRoutes),
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];
