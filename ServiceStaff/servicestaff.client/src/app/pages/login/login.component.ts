import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = ''; // ✅ Додаємо role

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      email: this.email,
      password: this.password,
      role: this.role  // ✅ Передаємо роль
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.token);
        const decodedToken: any = jwtDecode(res.token);
        console.log('Розкодований токен:', decodedToken);

        localStorage.setItem('role', decodedToken.role); // ✅ Витягуємо роль із токена

        switch (decodedToken.role) {
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
