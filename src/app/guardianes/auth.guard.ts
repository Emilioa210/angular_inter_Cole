import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminColegioService } from '../servicios/admin-colegio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private admin: AdminColegioService,
    private router: Router){ }
  canActivate(): boolean{
    if(!this.admin.isAuth()){
      console.log("Token no válido o expirado.");
      this.router.navigate(['cos_admin_login']);
      return false;
    }
    return true;
  }
  
}
