import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () =>
      import('./views/clientes/clientes.routes').then((m) => m.ClientesRoutes),
  }
];
