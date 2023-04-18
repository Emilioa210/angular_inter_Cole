import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  cantidad =0;
  cantidades: any[] = [];
  productos: any[] = [];
  producto =
  {
    CODIGO_PRODUCTO: '',
    NOMBRE_PRODUCTO: '',
    DESCRIPCION_PRODUCTO: '',
    PRECIO_PRODUCTO: '',
    IMG_PRODUCTO: ''
  }
  constructor(private productoDB:ProductoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.productoDB.get(id).subscribe(res=>{
        this.producto = res;
        console.log(this.producto)
    });
  }

  saveProducto(){

    let recoveredData = localStorage.getItem('productos');
    let recoveredCantidad = localStorage.getItem('cantidades');
    console.log("PRODUCTOS: "+typeof(JSON.parse(recoveredData!)[0].CODIGO_PRODUCTO));
    console.log("producto: "+typeof(this.producto.CODIGO_PRODUCTO));
    console.log("VALIDACION: "+this.producto.CODIGO_PRODUCTO ==JSON.parse(recoveredData!)[0].CODIGO_PRODUCTO);
    if(recoveredData == null && recoveredCantidad== null){
      this.productos.push(this.producto);
      this.cantidades.push(this.cantidad);
      localStorage.setItem('productos',JSON.stringify(this.productos))
      localStorage.setItem('cantidades',JSON.stringify(this.cantidades))

    }else if(JSON.parse(recoveredData!).includes(this.producto)){
      var posicion = JSON.parse(recoveredData!).indexOf(this.producto);
      console.log("POSICION PRODUCTO: "+posicion);
      this.cantidades = JSON.parse(recoveredCantidad!);
      this.cantidades[posicion] = this.cantidades[posicion]+this.cantidad;
      localStorage.setItem('cantidades',JSON.stringify(this.cantidades));

    }else{
      this.productos = JSON.parse(recoveredData!);
      this.cantidades = JSON.parse(recoveredCantidad!);
      this.productos.push(this.producto);
      this.cantidades.push(this.cantidad);
      localStorage.setItem('productos',JSON.stringify(this.productos));
      localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
    }

  }
}
