import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-cos-list',
  templateUrl: './admin-cos-list.component.html',
  styleUrls: ['./admin-cos-list.component.css']
})
export class AdminCosListComponent implements OnInit {

  @ViewChild("myModalPed", {static: false}) myModalPed!: TemplateRef<any>;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  @ViewChild("myModalInfo", { static: false }) myModalInfo!: TemplateRef<any>;

  pedidos: Array<any> = [];
  totales: Array<any> = [];
  productos: Array<any> = [];
  indice:number = -1;
  pedido ={
    CODIGO_PEDIDO: null,
    CODIGO_RECEPTOR: null,
    CODIGO_EMISOR: null,
    ID_ADMIN: null,
    ESTADO: false,
    MENSAJE: '',
    FECHA_PEDIDO: null
  };

  constructor(private pedidoDB: PedidoService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.pedidoDB.findByAdmin(id).subscribe(res=>{
        this.pedidos = res as any [];
        
        this.pedidos.map(pedido=>{
            var total = 0;
            pedido.productos.map((producto: any) =>{
              total += producto.total;
            });
            this.totales.push(total);
        });
        
    });
  }

  mostrarPedido(i:number){
    this.indice = i;
    this.productos = this.pedidos[i].productos;
    
    this.modalService.open(this.myModalPed).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }

  confirmarPedido(i:number){
    var codigo = this.pedidos[i].codigo_pedido;
    this.modalService.open(this.myModalConf).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
      if(r=="Si"){
        
        this.pedidoDB.get(codigo).subscribe(res=>{
          this.pedido.CODIGO_PEDIDO = res.CODIGO_PEDIDO;
          this.pedido.CODIGO_RECEPTOR = res.CODIGO_RECEPTOR;
          this.pedido.CODIGO_EMISOR = res.CODIGO_EMISOR;
          this.pedido.ID_ADMIN = res.ID_ADMIN;
          this.pedido.ESTADO = true;
          this.pedido.MENSAJE = res.MENSAJE;
          this.pedido.FECHA_PEDIDO = res.FECHA_PEDIDO;
    
          this.pedidoDB.update(codigo, this.pedido).subscribe(r=>{
            console.log(r);
            this.mostrarModalInfo();
          }, err =>{
            console.log(err);
          });
        });
      }
    }, error => {
      console.log(error);
    });  

  }

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
      if(r=="ACEPTAR"){
        window.location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

}