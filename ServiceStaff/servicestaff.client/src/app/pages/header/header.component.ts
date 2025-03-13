import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class HeaderComponent implements OnInit {
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUserRole();
  }

  loadUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userRole = decodedToken.role;
      
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  getButtonLabel(): string {
    switch (this.userRole) {
      case 'staff':
        return 'Мої замовлення';
      case 'chef':
        return 'Мої замовлення';
      case 'admin':
        return 'Панель керування';
      default:
        return 'Головна';
    }
  }

  onButtonClick(): void {
    switch (this.userRole) {
      case 'staff':
        this.router.navigate(['/waiter']);
        break;
      case 'chef':
        this.router.navigate(['/kitchen']);
        break;
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
}
