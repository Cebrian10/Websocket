// Importaciones de Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

// Importaciones de PrimeNG
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

// Importaciones propias
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ButtonModule, SplitterModule, NavbarComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDesktop: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(min-width: 768px)']).subscribe(result => {
      this.isDesktop = result.matches;
    });
  }
}
