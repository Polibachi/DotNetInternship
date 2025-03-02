import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';  // ✅ Замінено username → email
  password: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      email: this.email,  // ✅ Передаємо email замість username
      password: this.password,
      role: this.role
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        switch (res.role) {
          case 'staff':
            this.router.navigate(['/orders']);
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
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Неправильний email або пароль';
      }
    });
  }
}
