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
import { CorreoService } from 'src/app/servicios/correo.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ParaleloService } from 'src/app/servicios/paralelo.service';


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
  total = null;

  colegioEmisor = '';
  colegioReceptor = '';
  cursoEmisor = '';
  cursoReceptor = '';
  paraleloEmisor = '';
  paraleloReceptor = '';

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
    mensaje: '',
    tipo: null
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
    private pedidoProducto:PedidoProductoService,
    private correo: CorreoService,
    private cursoDB:CursoService,
    private paraleloDB:ParaleloService) { }

  ngOnInit(): void {
    this.colegioDB.getAll().subscribe(res=>{
      this.colegios = res as any[];
      console.log(this.colegios);
    });
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    this.total = JSON.parse(localStorage.getItem('total')!);
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
          TELEFONO_EMISOR: this.dataEmisor.telefono,
          TIPO_ENVIO: this.dataEmisor.tipo
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
        
        setTimeout(()=>{  
          this.sendMail();
        },4000);
  
         
      }
    }, error => {
      console.log(error);
    });
  }

  mostrarModalInfo(){
    
    this.modalService.open(this.myModalInfo).result.then( r => {
      if(r=='cerrar'){
        this.router.navigate(['comprobante']);
 
      }else{
        this.router.navigate(['comprobante']);
  
      }
    });
  }

  private generateTableRows(): string {
    let rows = '';
    this.productos.forEach((producto, index) => {
      rows += `
      <tr>
      <td class="text-left">${index + 1}</td>
      <td class="item_name">${producto.NOMBRE_PRODUCTO}</td>
      <td class="item_desc d-none d-sm-table-cell">
        ${producto.DESCRIPCION_PRODUCTO}
      </td>
      <td class="text-right">${producto.PRECIO_PRODUCTO}$</td>
      <td class="text-right">${this.cantidades[index]}</td>
      <td class="text-right">${producto.PRECIO_PRODUCTO * this.cantidades[index]}$</td>
      </tr>
      `;
    });
    return rows;
  }

  sendMail(): void{
    
    
    this.colegioDB.get(this.dataEmisor.colegio).subscribe(r=>{
      this.colegioEmisor=r.NOMBRE_COLEGIO;
    });
    this.colegioDB.get(this.receptor.colegio).subscribe(r=>{
      this.colegioReceptor=r.NOMBRE_COLEGIO;
    });
    this.cursoParaleloDB.get(this.dataEmisor.id_curso_paralelo).subscribe(r=>{
        this.cursoDB.get(r.CODIGO_CURSO).subscribe(res=>{
          this.cursoEmisor = res.NOMBRE_CURSO;
        });
        this.paraleloDB.get(r.CODIGO_PARALELO).subscribe(resp=>{
          this.paraleloEmisor = resp.NOMBRE_PARALELO;
        });
    });
    this.cursoParaleloDB.get(this.receptor.id_curso_paralelo).subscribe(r=>{
      this.cursoDB.get(r.CODIGO_CURSO).subscribe(res=>{
        this.cursoReceptor = res.NOMBRE_CURSO;
      });
      this.paraleloDB.get(r.CODIGO_PARALELO).subscribe(resp=>{
        this.paraleloReceptor = resp.NOMBRE_PARALELO;
      });
    });
    setTimeout(()=>{  
      console.log("COLEGIO EMISOR: "+this.colegioEmisor);
      console.log("COLEGIO RECEPTOR: "+this.colegioReceptor);
  
      var CODIGO_PEDIDO = JSON.parse(localStorage.getItem('id_pedido')!);
            var mail = {
            email: this.dataEmisor.correo,
            asunto: 'COMPROBANTE DE PEDIDO #'+CODIGO_PEDIDO,
            html: `
            <div class="main">
            <div class="container mt-3">
              <div class="card animate__animated animate__fadeIn">
                <div class="card-header">
                  <p><strong>FECHA:</strong> ${this.fecha}</p>
          
                  <div style="padding-right: 70%">
                    <span class="float-right"
                      ><strong>Estado:</strong> Pendiente por pagar a tu Consejo
                      Estudiantil</span
                    >
                  </div>
                  <div style="padding-right: 70%">
                    <span class="float-right"
                      ><strong>NÚMERO DE ORDEN: </strong> ${CODIGO_PEDIDO}</span
                    >
                  </div>
                </div>
                <div class="card-body">
                  <div class="row mb-4">
                    <div class="col-6 col-md-6">
                      <h6 class="mb-2">DE</h6>
                      <div>
                        <strong>${this.dataEmisor.nombre} ${this.dataEmisor.apellido}</strong>
                      </div>
                      <div>COLEGIO: ${this.colegioEmisor}</div>
                      <div>CURSO: ${this.cursoEmisor}</div>
                      <div>PARALELO: ${this.paraleloEmisor}</div>
                      <div>Email: ${this.dataEmisor.correo}</div>
                      <div>Phone: ${this.dataEmisor.telefono}</div>
                    </div>
          
                    <div class="col-6 col-md-6">
                      <h6 class="mb-2">PARA:</h6>
                      <div>
                        <strong>${this.receptor.nombre} ${this.receptor.apellido}</strong>
                      </div>
                      <div>COLEGIO: ${this.colegioReceptor}</div>
                      <div>CURSO: ${this.cursoReceptor}</div>
                      <div>PARALELO: ${this.paraleloReceptor}</div>
                    </div>
                  </div>
          
                  <div class="table-responsive-sm">
                    <table class="table table-sm table-striped">
                      <thead>
                        <tr>
                          <th scope="col" width="2%" class="center">#</th>
                          <th scope="col" width="20%">Producto/Servicio</th>
                          <th scope="col" class="d-none d-sm-table-cell" width="50%">
                            Descripción
                          </th>
          
                          <th scope="col" width="10%" class="text-right">P. Unidad</th>
                          <th scope="col" width="8%" class="text-right">Num.</th>
                          <th scope="col" width="10%" class="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                          ${this.generateTableRows()}
                      </tbody>
                    </table>
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-sm-5"></div>
          
                    <div class="col-lg-4 col-sm-5 ml-auto">
                      <table class="table table-sm table-clear">
                        <tbody>
                          <tr>
                            <td class="left">
                              <strong>Subtotal</strong>
                            </td>
                            <td class="text-right bg-light">$${this.total}</td>
                          </tr>
                          <tr>
                            <td class="left">
                              <strong>Total</strong>
                            </td>
                            <td class="text-right bg-light">
                              <strong>$${this.total}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `
            }
            console.log(mail);
            this.correo.sendMessage(mail).subscribe(res =>{
              console.log(res);
            },
            error =>{
              console.log(error);
            });
    },5000);
    
    
    
  
}

}
