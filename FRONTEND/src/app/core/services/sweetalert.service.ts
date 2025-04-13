import { inject, Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import { ApiService } from './api.service';
import { Response } from '../../shared/Response.interface';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  private readonly apiService = inject(ApiService);

  show(icono: string, titulo: string, texto: string, callback?: () => void) {
    Swal.fire({
      icon: icono as SweetAlertIcon,
      title: titulo,
      text: texto,
      timer: 2000,
      allowEscapeKey: false,
      showConfirmButton: false,
      allowOutsideClick: false,

      background: 'var(--p-content-background)',
      color: 'var(--p-text-color)',

      customClass: {
        popup: 'swal2-z-index',
      },
    }).then(() => {
      callback?.();
    });
  }

  showConfirm(icono: string, titulo: string, texto: string, callback?: () => void) {
    Swal.fire({
      icon: icono as SweetAlertIcon,
      title: titulo,
      text: texto,
      allowEscapeKey: false,
      showConfirmButton: true,
      allowOutsideClick: false,

      background: 'var(--p-content-background)',
      color: 'var(--p-text-color)',

      customClass: {
        popup: 'swal2-z-index',
      },
    }).then(() => {
      callback?.();
    });
  }

  showConfirmAccept(icono: string, titulo: string, texto: string, callback?: () => void) {
    Swal.fire({
      icon: icono as SweetAlertIcon,
      title: titulo,
      text: texto,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar',

      background: 'var(--p-content-background)',
      color: 'var(--p-text-color)',

      customClass: {
        popup: 'swal2-z-index',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callback?.();
      }
    });
  }

  showDelete(tipo: string, endpoint: string, callback?: () => void) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',

      background: 'var(--p-content-background)',
      color: 'var(--p-text-color)',

      customClass: {
        popup: 'swal2-z-index',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete<Response>(`${endpoint}`).subscribe({
          next: (res) => {
            Swal.fire({
              icon: res.icon as SweetAlertIcon,
              title: res.title,
              text: res.message,
              timer: 2000,
              // allowEnterKey: false,
              showConfirmButton: false,
              allowOutsideClick: false,

              background: 'var(--p-content-background)',
              color: 'var(--p-text-color)',

              customClass: {
                popup: 'swal2-z-index',
              },
            }).then(() => {
              callback?.();
            });
          },
          error: (error) => {
            this.showConfirm(error.error.icon, error.error.title, error.error.message)
          },
        });
      }
    });
  }

  showLoading(titulo: string, texto: string) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: texto,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,

      background: 'var(--p-content-background)',
      color: 'var(---p-text-color)',

      customClass: {
        popup: 'swal2-z-index',
      },
      willOpen: () => {
        Swal.showLoading();
      },
    });
  }

  close() {
    Swal.close();
  }
}
