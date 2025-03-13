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

  private allowedRoutes = ['/waiter', '/kitchen']; // Дозволені сторінки
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
      console.log(message);

      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...currentNotifications, message]);
      this.showNotification(message);
      this.refreshPage();
    });
  }

  refreshPage(): void {
    if (this.allowedRoutes.includes(this.currentRoute)) {  // Перевірка на дозволений маршрут
      window.location.reload();
    }
  }

public showNotification(message: any) {
    console.log("New notification!");
    //console.log("Current Route: ", this.currentRoute);

    // Перевірка, чи є в об'єкті message поля orderId та statusMessage
    if (message?.id && message?.status) {
      const notificationText = `Замовлення #${message.id} ${message.status}!`;

      if (!this.allowedRoutes.includes(this.currentRoute)) {
        this.snackBar.open(notificationText, 'Перейти', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }).onAction().subscribe(() => {
          // Тут буде дія при натисканні на кнопку
          this.router.navigate(['/home']); // Приклад переходу до сторінки з деталями замовлення
        });
      }
    } else {
      console.error("Недостатньо даних у повідомленні");
    }
  }



}
