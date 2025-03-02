import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrService } from '../../services/signalr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  //styleUrls: ['./notifications.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class NotificationsComponent {
  notifications$: Observable<string[]>; // ✅ Оголошуємо явно тип

  constructor(private signalrService: SignalrService) {
    this.notifications$ = this.signalrService.notifications$; // ✅ Присвоюємо у конструкторі
  }
}
