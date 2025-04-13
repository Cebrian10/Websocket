// Importaciones de angular
import { Component, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

// Importaciones de primeng
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

// Importaciones propias
import { ApiService } from '../../../core/services/api.service';
import { SweetalertService } from '../../../core/services/sweetalert.service';

// Interfaces
import { Cliente } from '../Cliente';
import { WebsocketService } from '../../../core/services/websocket.service';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [ButtonModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, TooltipModule, DialogModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit {

  // Inyección de servicios
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly swtAlert = inject(SweetalertService);
  private readonly ws = inject(WebsocketService);

  clientes: Cliente[] = [];
  clientesCountSignal = signal<number | null>(null);

  constructor() {
    // WebSocket para cambios en tiempo real
    const wsSignal = this.ws.subscribe<number>('/topic/clientes/count');

    effect(() => {
      const value = wsSignal();
      if (value != null) {
        this.clientesCountSignal.set(value);
      }
    });
  }

  ngOnInit() {
    this.fetchClientesCount();
    this.fetchClientes();
  }


  fetchClientes() {
    this.api.get<Cliente[]>(`clientes`).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {

      }
    })
  }

  fetchClientesCount() {
    this.api.get<number>('clientes/count').subscribe(count => {
      this.clientesCountSignal.set(count);
    });
  }

  crear = () => this.router.navigate([this.router.url + '/crear']);
  editar = (id: number) => this.router.navigate([this.router.url + `/editar/${id}`]);
  eliminar(id: number) {
    this.swtAlert.showDelete('El cliente', `clientes/${id}`, () => {
      this.fetchClientes();
    });
  }

}
