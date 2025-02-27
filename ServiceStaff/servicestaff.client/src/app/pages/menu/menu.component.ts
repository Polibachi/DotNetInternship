import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'; // Додайте цей імпорт
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MatSlideToggleModule, MatMenuModule, MatCardModule] // Додайте цей модуль
})
export class MenuComponent {

  // Логіка компоненту
}
