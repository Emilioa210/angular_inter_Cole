import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cos-admin-login',
  templateUrl: './cos-admin-login.component.html',
  styleUrls: ['./cos-admin-login.component.css']
})
export class CosAdminLoginComponent implements OnInit {
  @ViewChild("myModalInfo", { static: false }) myModalInfo!: TemplateRef<any>;

  admin = {
    usuario:'',
	  contrasena: ''
  }

  constructor(private adminDB: AdminColegioService,
              private router:Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    this.adminDB.singin(this.admin).subscribe( res =>{
      localStorage.setItem('token', res.token);
      this.adminDB.findByUsuario(this.admin.usuario).subscribe( res =>{
        this.goToAdmin(res.ID_ADMIN);
  
      });
    }, err =>{
      this.mostrarModalInfo();
    });
 
  }

  goToAdmin(id: number){
    this.router.navigate([]).then(_result => {
      window.location.replace(`admin-cos/`+id);
    });
        //this.router.navigate(['admin', id]);
  }

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }

}
