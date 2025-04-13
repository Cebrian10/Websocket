import { Routes } from '@angular/router';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { CrearClientesComponent } from './crear-clientes/crear-clientes.component';

export const ClientesRoutes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'crear', component: CrearClientesComponent }
]