// Importaciones de angular
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// Importaciones de PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

// Importaciones propias
import { SweetalertService } from '../../../core/services/sweetalert.service';
import { ApiService } from '../../../core/services/api.service';

// Interfaces
import { Response } from '../../../shared/Response.interface';

@Component({
  selector: 'app-editar-clientes',
  imports: [ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.scss'
})
export class EditarClientesComponent implements OnInit {

  // Inyección de servicios
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly swtAlert = inject(SweetalertService);
  private readonly router = inject(Router);
  readonly location = inject(Location);

  // Variables
  form!: FormGroup;

  // --------------------- Métodos del ciclo de Angular (ngOnInit) ---------------------

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      edad: [0, Validators.required],
    });
  }

  editar() {
    this.swtAlert.showLoading('Editando cliente...', 'Por favor espere un momento');

    this.api.put<Response>('clientes', this.form.value).subscribe({
      next: (res) => {
        this.swtAlert.show(res.icon, res.title, res.message, () => {
          (res.icon === 'success') ? this.router.navigate(['/clientes']) : '';
        });
      },
      error: (error) => {
        this.swtAlert.showConfirm(error.error.icon, error.error.title, error.error.message);
      },
    });
  }

}
