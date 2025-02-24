import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Standalone компоненти (їх імпортуємо)
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [], // Видаляємо standalone-компоненти з declarations
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,

    // Standalone компоненти додаємо в imports
    LoginComponent,
    OrdersComponent,
    KitchenComponent,
    OrderItemComponent,
    OrderListComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
