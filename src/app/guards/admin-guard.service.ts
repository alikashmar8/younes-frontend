import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('access_token');
    console.log(token);

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    // decode the token to get its payload
    const tokenPayload: any = decode(token);
    const role: string = tokenPayload.user.role;
    if (!this.auth.isAuthenticated() || !role.match(UserRole.ADMIN)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
