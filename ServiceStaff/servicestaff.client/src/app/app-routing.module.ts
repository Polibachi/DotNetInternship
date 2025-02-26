import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Головна сторінка
  { path: 'login', component: LoginComponent },  // Сторінка логіну
  { path: 'register', component: RegisterComponent },  // Сторінка реєстрації
  { path: 'orders', component: OrdersComponent },  // Замовлення
  { path: 'kitchen', component: KitchenComponent },  // Кухня
  { path: 'order-list', component: OrderListComponent },  // Список замовлень
  { path: 'order-item', component: OrderItemComponent }  // Окремий елемент замовлення
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
