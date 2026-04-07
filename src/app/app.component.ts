import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fanscore';
  private authService = inject(AuthService);

  constructor(){

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getMe().subscribe({
        error: () => {
          this.authService.logout();
        }
      });
    }
  }
}
