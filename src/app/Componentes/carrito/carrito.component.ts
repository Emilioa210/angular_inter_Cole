import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
 cantidad = 0;
 items = 0;
 totales = 0;
 cantidades: any[] = [];
 productos: any[] = []; 
 producto ={
  CODIGO_PRODUCTO: '',
  NOMBRE_PRODUCTO: '',
  DESCRIPCION_PRODUCTO: '',
  PRECIO_PRODUCTO: '',
  IMG_PRODUCTO: ''
}
  constructor(private router: Router) { }

  ngOnInit(): void {
      var i = 0;
      var total = 0;
      this.productos = JSON.parse(localStorage.getItem('productos')!);
      this.items = this.productos.length;
      this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);


      this.productos.forEach(producto =>{
          total += producto.PRECIO_PRODUCTO * this.cantidades[i];
          i++;
      });
      localStorage.setItem('total',JSON.stringify(total));
      this.totales = JSON.parse(localStorage.getItem('total')!);
  }

  deleteProducto(i:number){
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')!);
    var auxProd = this.productos.filter((item) => item.CODIGO_PRODUCTO !== this.productos[i].CODIGO_PRODUCTO);

    this.cantidades.splice(i,1);

    localStorage.setItem('productos',JSON.stringify(auxProd));
    localStorage.setItem('cantidades',JSON.stringify(this.cantidades));  
    window.location.reload();
  }

  ingresoData(){
    this.router.navigate(['ingreso-data']);
  }

}
