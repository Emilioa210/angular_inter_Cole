import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import decode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  @ViewChild("myModalInfo", { static: false }) myModalInfo!: TemplateRef<any>;

  productos: any[] = [];
  items = 0;
  role: any =null;
  verifyAdmin = false;

  adminColegio={
    CODIGO_COLEGIO:'',
    USUARIO_ADMIN:'',
    CONTRASENA_ADMIN:''
  }

  contrasena_antigua = '';
  contrasena_nueva = '';
  confirma_contrasena = '';

  constructor(private router: Router,
              private admin:AdminColegioService,
              private modalService: NgbModal) { }

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

  mostrarModalConf(){
    
      if(this.canActivate()){
        this.modalService.open(this.myModalConf).result.then( r => {
          if(r=="Si"){
            
            this.admin.get(this.role.ID_ADMIN).subscribe(res=>{
                
                if(this.contrasena_antigua==res.CONTRASENA_ADMIN){
                  if(this.contrasena_nueva==this.confirma_contrasena){
 
                    this.adminColegio.CODIGO_COLEGIO=res.CODIGO_COLEGIO;
                    this.adminColegio.USUARIO_ADMIN=res.USUARIO_ADMIN;
                    this.adminColegio.CONTRASENA_ADMIN=this.contrasena_nueva;
  
                    this.admin.update(res.ID_ADMIN,this.adminColegio).subscribe(r=>{
                      console.log("CONTRASENA CAMBIADA CORRECTAMENTE "+r);
                      this.mostrarModalInfo();
                    }, error => {
                      console.log(error)
                    });
                  }
                  
                }
            }, error => {
              console.log(error)
            });
          }
        });    
      }
  }

  mostrarModalInfo(){
    
    this.modalService.open(this.myModalInfo);
  }
  

}
