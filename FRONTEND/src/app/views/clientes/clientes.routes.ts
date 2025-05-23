import { Routes } from '@angular/router';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { CrearClientesComponent } from './crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';

export const ClientesRoutes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'crear', component: CrearClientesComponent },
  { path: 'editar/:id', component: EditarClientesComponent },
]