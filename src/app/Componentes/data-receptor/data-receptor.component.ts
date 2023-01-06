import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoParaleloService } from 'src/app/servicios/curso-paralelo.service';
import { Router } from '@angular/router';
import { EmisorService } from 'src/app/servicios/emisor.service';
import { ReceptorService } from 'src/app/servicios/receptor.service';
import * as moment from 'moment';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoCantidadService } from 'src/app/servicios/producto-cantidad.service';
import { PedidoProductoService } from 'src/app/servicios/pedido-producto.service';


@Component({
  selector: 'app-data-receptor',
  templateUrl: './data-receptor.component.html',
  styleUrls: ['./data-receptor.component.css']
})
export class DataReceptorComponent implements OnInit {

  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  @ViewChild("myModalInfo", { static: false }) myModalInfo!: TemplateRef<any>;
  cantidades: any[] = [];
  productos: any[] = []; 

  admin ={
    ID_ADMIN: '',
    CODIGO_COLEGIO: '',
    USUARIO_ADMIN: '',
    CONTRASENA_ADMIN: ''
  };

  fecha = '';
  dataEmisor = {
    nombre:'',
    apellido: '',
    correo: '',
    telefono: '',
    colegio: '',
    id_curso_paralelo: null,
    apodo: '',
    regalo_apodo: false,
    mensaje: ''
}
  colegios: Array<any> = [];
  cursos: Array<any> = [];
  curso:any = '';
  paralelos: Array<any> = [];
  paralelo:any = '';
  receptor = {
    nombre:'',
    apellido: '',
    colegio: '',
    id_curso_paralelo: null,
}

  constructor(private colegioDB: ColegioService,
    private cursoParaleloDB: CursoParaleloService,
    private router: Router,
    private emisorDB:EmisorService,
    private receptorDB: ReceptorService,
    private adminDB:AdminColegioService,
    private pedidoDB:PedidoService,
    private modalService: NgbModal,
    private productoCant:ProductoCantidadService,
    private pedidoProducto:PedidoProductoService) { }

  ngOnInit(): void {
    this.colegioDB.getAll().subscribe(res=>{
      this.colegios = res as any[];
      console.log(this.colegios);
    });
  }

  selectColegio(event: any){
    var e = event.target.value;
    this.colegioDB.findCursos(e).subscribe(res=>{
      this.cursos=res as any [];
      var hash:any = {};

      this.cursos = this.cursos.filter(function(current) {
      var exists = !hash[current.CODIGO_CURSO];
      hash[current.CODIGO_CURSO] = true;
      return exists;
      });
        
        console.log(JSON.stringify(this.cursos));
    });

  }
  selectCurso(event:any){
    var e = event.target.value;
    this.colegioDB.findParalelosPorCursos(this.receptor.colegio,e).subscribe(res =>{
      this.paralelos = res as any[];
      console.log(this.paralelos);
    });
  }

  selectParalelo(event:any){
    this.cursoParaleloDB.findCursoParalelo(this.curso, this.paralelo).subscribe(res=>{
        this.receptor.id_curso_paralelo = res.ID_CURSO_PARALELO;
    });

  }

  saveReceptor(){
    console.log(this.receptor);
    localStorage.setItem('receptor',JSON.stringify(this.receptor));
    this.dataEmisor = JSON.parse(localStorage.getItem('emisor')!);

   

    
    this.adminDB.findOneColegio(this.dataEmisor.colegio).subscribe(res=>{
        console.log(res);
        localStorage.setItem('id_admin',res.ID_ADMIN);
    });

    moment.locale("es");
    moment().format("L"); 
    const hoy = Date.now(); 
    this.fecha=moment(hoy).format("YYYY-MM-DD");
    console.log('FECHA: '+this.fecha);
     
    this.mostrarModalConf();
    
    
  }

  mostrarModalConf(){
    this.modalService.open(this.myModalConf).result.then( r => {

      if(r=='Si'){

        const emisor ={
          CODIGO_COLEGIO: this.dataEmisor.colegio,
          ID_CURSO_PARALELO: this.dataEmisor.id_curso_paralelo,
          NOMBRE_EMISOR: this.dataEmisor.nombre,
          APELLIDO_EMISOR: this.dataEmisor.apellido,
          CORREO_EMISOR: this.dataEmisor.correo,
          APODO: this.dataEmisor.apodo,
          TELEFONO_EMISOR: this.dataEmisor.telefono
        };
    
        const Receptor ={
          CODIGO_COLEGIO: this.receptor.colegio,
          ID_CURSO_PARALELO: this.receptor.id_curso_paralelo,
          APELLIDO_RECEPTOR: this.receptor.apellido,
          NOMBRE_RECEPTOR: this.receptor.nombre
        };
    
        this.emisorDB.create(emisor).subscribe(res =>{
        
          console.log(res);
          localStorage.setItem('id_emisor',res.CODIGO_EMISOR);
        },
        error =>{
          console.log(error);
        });
    
        this.receptorDB.create(Receptor).subscribe(res =>{
          console.log(res);
          localStorage.setItem('id_receptor',res.CODIGO_RECEPTOR);
        },
        error =>{
          console.log(error);
        });


        setTimeout(()=>{    
          const pedido ={
            CODIGO_RECEPTOR: JSON.parse(localStorage.getItem('id_receptor')!),
            CODIGO_EMISOR: JSON.parse(localStorage.getItem('id_emisor')!),
            ID_ADMIN: JSON.parse(localStorage.getItem('id_admin')!),
            ESTADO: 0,
            MENSAJE: this.dataEmisor.mensaje,
            FECHA_PEDIDO: this.fecha
            };

          this.pedidoDB.create(pedido).subscribe(res=>{
            console.log(res);
            localStorage.setItem('id_pedido',res.CODIGO_PEDIDO);
          },error=>{
            console.log(error);
          });


          var i = 0;
          this.productos = JSON.parse(localStorage.getItem('productos')!);
          this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
  
          this.productos.forEach(producto=>{
            
            this.productoCant.findProductoCantidad(producto.CODIGO_PRODUCTO, this.cantidades[this.productos.indexOf(producto)]).subscribe(res=>{
              

              if(res != null){
                  
                setTimeout(()=>{
                  const pedidoProd ={
                    ID_PRODUCTO_CANTIDAD: res.ID_PRODUCTO_CANTIDAD,
                    CODIGO_PEDIDO: JSON.parse(localStorage.getItem('id_pedido')!)
                  };
    
                  this.pedidoProducto.create(pedidoProd).subscribe(res=>{
                      console.log(res);
                  },error=>{
                    console.log(error);
                  });

                }, 1000);
                
  
              }else{
                setTimeout(()=>{
                const producto_cantidad ={
                  CODIGO_PRODUCTO: producto.CODIGO_PRODUCTO,
                  
                  CANTIDAD_PRODUCTO: this.cantidades[this.productos.indexOf(producto)]
                  
                };
                console.log('INDICE Producto Cantidad OBJETO: '+this.productos.indexOf(producto));

                this.productoCant.create(producto_cantidad).subscribe(res=>{
                  console.log(res);
                  const pedidoProd ={
                    ID_PRODUCTO_CANTIDAD: res.ID_PRODUCTO_CANTIDAD,
                    CODIGO_PEDIDO: JSON.parse(localStorage.getItem('id_pedido')!)
                  };
                  
                  this.pedidoProducto.create(pedidoProd).subscribe(res=>{
                      console.log(res);
                  },error=>{
                    console.log(error);
                  });
                });
               }, 1000);
              }



  
            });
            
          });
          this.mostrarModalInfo();
        }, 3000);
        

         
      }
    }, error => {
      console.log(error);
    });
  }

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo).result.then( r => {
      if(r=='cerrar'){
        localStorage.clear();
      }else{
        localStorage.clear();
      }
    });
  }

}
