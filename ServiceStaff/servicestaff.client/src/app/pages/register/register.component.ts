import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    name: '',
    role: 'staff'
  };

  onSubmit() {
    console.log('Реєстрація:', this.user);
  }
}
