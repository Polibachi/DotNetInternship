import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private notificationsSubject = new BehaviorSubject<string[]>([]); // ✅ Створюємо стрім
  notifications$ = this.notificationsSubject.asObservable(); // ✅ Публічний потік

  constructor() {
    this.startConnection();
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
      this.notificationsSubject.next([...currentNotifications, message]); // ✅ Оновлюємо список
    });
  }
}
