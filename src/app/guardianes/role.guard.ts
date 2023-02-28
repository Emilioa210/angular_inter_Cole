import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminColegioService } from '../servicios/admin-colegio.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  role={
    ID_ADMIN:'',
    CODIGO_COLEGIO: '',
    USUARIO_ADMIN: '',
    CONTRASENA_ADMIN: ''
  };
  constructor(private admin: AdminColegioService,
    private router: Router,
    private route: ActivatedRoute){ }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    const rolEsperado = route.data['expectedRole'];
    console.log("ROL ESPERADO: "+rolEsperado);
    const token:any = localStorage.getItem('token');
    try{
      
      this.role = decode(token);
      console.log("ROL TOKEN: "+this.role);
    }catch(e){
      console.log(e);
    }
      if(!this.admin.isAuth() || this.role !== rolEsperado ){
        console.log('Usuario no autorizado para esta pantalla');
        this.router.navigate(['cos_admin_login']);
        return false;
      }
    return true;
  }
  
}
