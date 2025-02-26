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
  username: string = '';
  password: string = '';
  role: string = ''; // ✅ Додаємо змінну для select
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      username: this.username,
      password: this.password,
      role: this.role // ✅ Передаємо роль
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        // ✅ Розподіл за роллю
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
        this.errorMessage = 'Неправильний логін або пароль';
      }
    });
  }
}
