import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles && !allowedRoles.includes(userRole!)) {
      this.router.navigate(['/home']); // ❌ Якщо нема прав, відправляємо на Home
      return false;
    }

    return true;
  }
}
