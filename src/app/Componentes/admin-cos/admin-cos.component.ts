import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import decode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-admin-cos',
  templateUrl: './admin-cos.component.html',
  styleUrls: ['./admin-cos.component.css']
})
export class AdminCosComponent implements OnInit {
  @ViewChild("myModalInfo", { static: false }) myModalInfo!: TemplateRef<any>;

  colegio= {
    CODIGO_COLEGIO: '',
    NOMBRE_COLEGIO: ''
  }
  pedidos: Array<any> = [];
  totales=0;

  role: any =null;
  admin = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adminDB:AdminColegioService,
              private colegioDB:ColegioService,
              private modalService: NgbModal,
              private pedidoDB: PedidoService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    const token:any = localStorage.getItem('token');
    try{
      this.role = decode(token);
      
    }catch(e){
      console.log(e);
    }
    if(this.adminDB.isAuth() && this.role.ID_ADMIN != null && this.role.ID_ADMIN == id){
       console.log('Sesión iniciada Admin');
    
          this.adminDB.get(id).subscribe(res=>{
            this.colegioDB.get(res.CODIGO_COLEGIO).subscribe(r =>{
              console.log("COLEGIO: "+r.NOMBRE_COLEGIO);
                this.colegio = r;
            });
          });

          this.pedidoDB.findByAdmin(id).subscribe(res=>{
            this.pedidos = res as any [];
            
            this.pedidos.map(pedido=>{
                var total = 0;
                if(pedido.estado==1){
                  pedido.productos.map((producto: any) =>{
                  
                    total += producto.total;
                  });
                  this.totales+=total;
                }
                
                
            });
            
          });
    }else{
         console.log("Sesión no iniciada");
         localStorage.removeItem('token');
         this.router.navigate([]).then(_result => {
           window.location.replace(`cos_admin_login`);
         });
     }

  }
  goToPedidos(){
    var id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([]).then(_result => {
      window.location.replace(`admin-cos-list/`+id);
    });
  }

  mostrarModalInfo(){
    
    this.modalService.open(this.myModalInfo);
  }
  

}
