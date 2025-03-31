import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  title = 'simulaMath';
}
