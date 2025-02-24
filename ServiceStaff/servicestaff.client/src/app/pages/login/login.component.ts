import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,  // ✅ Standalone-компонент
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]  // ✅ Додаємо необхідні модулі
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    if (this.username === 'waiter') {
      this.router.navigate(['/orders']); // Перехід на сторінку замовлень
    } else if (this.username === 'chef') {
      this.router.navigate(['/kitchen']); // Перехід на сторінку кухні
    } else {
      alert('Неправильний логін або пароль');
    }
  }
}
