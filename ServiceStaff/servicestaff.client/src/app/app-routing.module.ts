import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent, /*canActivate: [AuthGuard], data: { roles: ['staff'] }*/ },
  { path: 'kitchen', component: KitchenComponent, /*canActivate: [AuthGuard], data: { roles: ['chef'] }*/ },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'order-item', component: OrderItemComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
