import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoParaleloService } from 'src/app/servicios/curso-paralelo.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ParaleloService } from 'src/app/servicios/paralelo.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {

  emisor = {
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

receptor = {
  nombre:'',
  apellido: '',
  colegio: '',
  id_curso_paralelo: null,
}

productos: Array<any> = [];
cantidades: Array<any> = [];
total = null;
orden = null;
fecha = '';

colegio_emisor = '';
colegio_receptor = '';
curso_emisor = '';
curso_receptor = '';
paralelo_emisor='';
paralelo_receptor='';

  constructor(private colegioDB:ColegioService,
              private curso_paraleloDB:CursoParaleloService,
              private cursoDB:CursoService,
              private paraleloDB: ParaleloService,
              private pedidoDB:PedidoService,
              private router: Router) { }

  ngOnInit(): void {

    /*moment.locale("es");
    moment().format("L"); 
    const hoy = Date.now(); 
    this.fecha=moment(hoy).format("YYYY-MM-DD");*/

    this.emisor = JSON.parse(localStorage.getItem('emisor')!);
    this.receptor = JSON.parse(localStorage.getItem('receptor')!);
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.orden = JSON.parse(localStorage.getItem('id_pedido')!);
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    this.total = JSON.parse(localStorage.getItem('total')!);

    this.pedidoDB.get(this.orden).subscribe(res=>{
          this.fecha = res.FECHA_PEDIDO;
    });

    this.colegioDB.get(this.emisor.colegio).subscribe(res=>{
        this.colegio_emisor = res.NOMBRE_COLEGIO;
    });

    this.colegioDB.get(this.receptor.colegio).subscribe(res=>{
      this.colegio_receptor = res.NOMBRE_COLEGIO;
    });

    this.curso_paraleloDB.get(this.emisor.id_curso_paralelo).subscribe(res=>{

      this.cursoDB.get(res.CODIGO_CURSO).subscribe(r=>{
              this.curso_emisor = r.NOMBRE_CURSO;
      });

      this.paraleloDB.get(res.CODIGO_PARALELO).subscribe(r=>{
            this.paralelo_emisor = r.NOMBRE_PARALELO;
      });
    });

    this.curso_paraleloDB.get(this.receptor.id_curso_paralelo).subscribe(res=>{

      this.cursoDB.get(res.CODIGO_CURSO).subscribe(r=>{
              this.curso_receptor = r.NOMBRE_CURSO;
      });

      this.paraleloDB.get(res.CODIGO_PARALELO).subscribe(r=>{
            this.paralelo_receptor = r.NOMBRE_PARALELO;
      });
    });
  }

  onClickAceptar(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
