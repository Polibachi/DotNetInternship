import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { HeaderComponent } from './pages/header/header.component';  // Імпортуємо HeaderComponent

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, NotificationsComponent, HeaderComponent]  // Додаємо HeaderComponent до imports
})
export class AppComponent {
  title = 'servicestaff.client';
}
