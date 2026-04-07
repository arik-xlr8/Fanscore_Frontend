import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MeResponse } from '../../../models/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  currentUser$: Observable<MeResponse | null>;
  isLoggedIn$ : Observable<boolean>;


  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
  }

  onLogout(): void {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigateByUrl('/login');
    },
    error: () => {
      this.authService.clearAuth();
      this.router.navigateByUrl('/login');
    }
  });
}

}
