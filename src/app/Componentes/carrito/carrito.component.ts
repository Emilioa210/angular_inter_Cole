import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
 cantidad = 0;
 items = 0;
 cantidades: any[] = [];
 productos: any[] = []; 
 producto ={
  CODIGO_PRODUCTO: '',
  NOMBRE_PRODUCTO: '',
  DESCRIPCION_PRODUCTO: '',
  PRECIO_PRODUCTO: '',
  IMG_PRODUCTO: ''
}
  constructor() { }

  ngOnInit(): void {
    
      this.productos = JSON.parse(localStorage.getItem('productos')!);
      this.items = this.productos.length;
      console.log('Productos: '+this.productos[0].NOMBRE_PRODUCTO)
      this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    console.log('Cantidades: '+this.cantidades[0]);
  }

  deleteProducto(i:number){
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    let auxProd = this.productos.slice(i,i+1);
    let auxCant = this.cantidades.slice(i,i+1);
    localStorage.setItem('productos',JSON.stringify(auxProd));
    localStorage.setItem('cantidades',JSON.stringify(auxCant));
  }

}
