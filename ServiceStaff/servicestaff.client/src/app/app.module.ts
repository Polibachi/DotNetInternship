import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { KitchenComponent } from './pages/kitchen/kitchen.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [], // Видаляємо standalone-компоненти з declarations
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    // Standalone компоненти додаємо в imports
    LoginComponent,
    OrdersComponent,
    KitchenComponent,
    OrderItemComponent,
    OrderListComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
