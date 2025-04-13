// Importaciones de angular
import { Component, effect, inject, OnInit, signal } from '@angular/core';
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
import { Message } from '@stomp/stompjs';

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
  clientesSignal = this.ws.subscribe<any[]>('/topic/clientes');

  ngOnInit() {

  }

  constructor() {
    // Primero te suscribís para tener la señal
    // const clientesSignal = this.ws.subscribe<any[]>('/topic/clientes');

    // Luego esperás que el WebSocket esté conectado
    this.ws.publishWhenReady('/app/init', {}).then(() => {
      // En este punto el servidor debería responder a /topic/clientes

      // Esperás a que llegue el valor usando un pequeño intervalo o efecto
      const interval = setInterval(() => {
        const data = this.clientesSignal();
        if (data) {
          console.log('✅ Clientes recibidos:', data);
          clearInterval(interval);
        }
      }, 100); // chequea cada 100ms si llegó
    });

    this.fetchClientes(); // si es necesario
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

  crear = () => this.router.navigate([this.router.url + '/crear']);
  editar = (id: number) => this.router.navigate([this.router.url + `/editar/${id}`]);
  eliminar(id: number) {
    this.swtAlert.showDelete('El cliente', `clientes/${id}`, () => {
      this.fetchClientes();
    });
  }

}
