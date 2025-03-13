import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user = { email: '', password: '', name: '', role: '' }; // 🔹 Змінив username → email
  errorMessage: string = '';
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    console.log('🔹 Sending request:', this.user);

    this.authService.register(this.user).subscribe({
      next: () => {
        console.log('✅ Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        this.errorMessage = 'Помилка реєстрації';
      }
    });
  }
}
