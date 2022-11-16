import { Component, OnInit } from '@angular/core';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cos-admin-login',
  templateUrl: './cos-admin-login.component.html',
  styleUrls: ['./cos-admin-login.component.css']
})
export class CosAdminLoginComponent implements OnInit {

  admin = {
    usuario:'',
	  contrasena: ''
  }

  constructor(private adminDB: AdminColegioService,
              private router:Router) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    this.adminDB.singin(this.admin).subscribe( res =>{
      localStorage.setItem('token', res.token);
      this.adminDB.findByUsuario(this.admin.usuario).subscribe( res =>{
        this.goToAdmin(res.id_administrador);
  
      });
    }, err =>{
      console.log(err);
    });
 
  }

  goToAdmin(id: number){
    this.router.navigate([]).then(_result => {
      window.location.replace(`admin-cos/`+id);
    });
        //this.router.navigate(['admin', id]);
  }

}
