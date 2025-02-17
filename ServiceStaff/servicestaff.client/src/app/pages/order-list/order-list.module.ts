import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';

@NgModule({
  declarations: [OrderListComponent], // Оголошуємо компонент
  imports: [CommonModule], // Додаємо необхідний модуль
  exports: [OrderListComponent] // Експортуємо компонент
})
export class OrderListModule { }
