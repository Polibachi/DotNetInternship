import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';

import { AuthGuard } from './guards/auth.guard'; // ✅ Імпортуємо Guard

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ✅ Правильне перенаправлення
  { path: 'home', component: HomeComponent }, // ✅ Додаємо home
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard] },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'order-item', component: OrderItemComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
