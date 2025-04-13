// Importaciones de Angular
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importaciones de PrimeNG
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, ButtonModule, TooltipModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly router = inject(Router)

  iconTheme = 'pi pi-sun';
  nameTheme = 'Modo claro';

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/inicio' },
      { label: 'Clientes', icon: 'pi pi-users', routerLink: '/clientes' },
      // {
      //   label: 'Productos',
      //   icon: 'pi pi-search',
      //   items: [
      //     { label: 'Bancarios', icon: 'pi pi-credit-card', routerLink: '/productos-bancarios' },
      //     { label: 'Comerciales', icon: 'pi pi-briefcase', routerLink: '/productos-comerciales' },
      //     { label: 'Legales', icon: 'pi pi-shield', routerLink: '/productos-legales' }
      //   ]
      // },
      // { label: 'Implementaciones', icon: 'pi pi-cog', routerLink: '/implementaciones' },
      // { label: 'Contacto', icon: 'pi pi-phone', routerLink: '/contacto' },
    ]
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (!element) return;

    const isDark = element.classList.toggle('my-app-dark');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    this.iconTheme = isDark ? 'pi pi-sun' : 'pi pi-moon';
    this.nameTheme = isDark ? 'Modo claro' : 'Modo oscuro';
  }

  onLogoClick() {
    this.router.navigate(['/inicio']);
  }

}
