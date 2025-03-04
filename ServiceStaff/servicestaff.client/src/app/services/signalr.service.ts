import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private allowedRoutes = ['/orders', '/kitchen']; // Дозволені сторінки
  private currentRoute: string = '';

  constructor(private snackBar: MatSnackBar, private router: Router) {
    this.startConnection();

    // Відстежуємо зміну маршруту
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5081/orderHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch((err) => console.error('Error while starting SignalR:', err));

    this.hubConnection.on('ReceiveNotification', (message: string) => {
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...currentNotifications, message]);
      this.showNotification(message);
    });
  }

  public showNotification(message: string) {  // ✅ Було private → стало public
    console.log("New notification!");
    console.log(message);
    if (this.allowedRoutes.includes(this.currentRoute)) { // ✅ Перевірка маршруту
      this.snackBar.open(message, 'Закрити', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }
}
