import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  constructor() { }

  ngOnInit(): void {

    moment.locale("es");
    moment().format("L"); 
    const hoy = Date.now(); 
    this.fecha=moment(hoy).format("YYYY-MM-DD");

    this.emisor = JSON.parse(localStorage.getItem('emisor')!);
    this.receptor = JSON.parse(localStorage.getItem('receptor')!);
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.orden = JSON.parse(localStorage.getItem('id_pedido')!);
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    this.total = JSON.parse(localStorage.getItem('total')!);
  }

}
