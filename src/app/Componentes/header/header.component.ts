import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productos: any[] = [];
  items = 0;
  role: any =null;
  verifyAdmin = false;
  constructor(private router: Router,
              private admin:AdminColegioService) { }

  ngOnInit(): void {

    this.verifyAdmin = this.canActivate();
    if (localStorage.getItem('productos') !== null) {
      this.productos = JSON.parse(localStorage.getItem('productos')!);
      this.items = this.productos.length;
    } 
    
  }

  menuShow = false;
  toggleNavbar() {
    this.menuShow = !this.menuShow;
  }

  canActivate():boolean{
    //const expectedRole = route.data.expectedRole;
    const token:any = localStorage.getItem('token');
    try{
      this.role = decode(token);
    }catch(e){
      console.log(e);
    }
      if(!this.admin.isAuth()||this.role.ID_ADMIN == null){
        console.log('Sesión no iniciada Admin');
        return false;
      }
      console.log('Sesión iniciada Admin');
     
    return true;
  }

  goToPedidos(){
    const token:any = localStorage.getItem('token');
    try{
      this.role = decode(token);
    }catch(e){
      console.log(e);
    }
      if(!this.admin.isAuth() || this.role.ID_ADMIN == null){
        console.log('Sesión no iniciada Admin');
        this.router.navigate(['cos_admin_login']);
      }else{
        console.log('Sesión iniciada Admin');
        this.router.navigate(['admin-cos-list', this.role.ID_ADMIN]);
      }
    
  }

  goToMenu(){
    const token:any = localStorage.getItem('token');
    try{
      this.role = decode(token);
    }catch(e){
      console.log(e);
    }
      if(!this.admin.isAuth() || this.role.ID_ADMIN == null){
        console.log('Sesión no iniciada Admin');
        this.router.navigate(['cos_admin_login']);
      }else{
        console.log('Sesión iniciada Admin');
        this.router.navigate(['admin-cos', this.role.ID_ADMIN]);
      }
    
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate([]).then(_result => {
      window.location.replace(`cos_admin_login`);
    });
  }

}
