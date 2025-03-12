import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrService } from '../../services/signalr.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Додаємо Router
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
})
export class NotificationsComponent {
  notifications$: Observable<string[]>;

  constructor(
    private signalrService: SignalrService,
    private snackBar: MatSnackBar,
    private router: Router // Інжектуємо Router
  ) {
    this.notifications$ = this.signalrService.notifications$;

    this.notifications$.subscribe((notifications) => {
      notifications.forEach((message) => this.checkAndShowNotification(message));
    });
  }

  checkAndShowNotification(message: string) {
    // Отримуємо поточний маршрут
    const currentRoute = this.router.url;

    // Показуємо snackbar тільки на сторінках /orders і /kitchen
    if (currentRoute.includes('/orders') || currentRoute.includes('/kitchen')) {
      this.showNotification(message);
    }
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Закрити', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }
}
