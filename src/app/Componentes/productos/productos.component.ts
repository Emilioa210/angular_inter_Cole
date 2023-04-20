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
        //console.log(this.producto)
    });
  }

  saveProducto(){
    let recoveredData = localStorage.getItem('productos')
    let recoveredCantidad = localStorage.getItem('cantidades')
    if(recoveredData == null && recoveredCantidad== null){
      this.productos.push(this.producto);
      this.cantidades.push(this.cantidad);
      localStorage.setItem('productos',JSON.stringify(this.productos))
      localStorage.setItem('cantidades',JSON.stringify(this.cantidades))
    }else{
      this.productos = JSON.parse(recoveredData!);
      this.cantidades = JSON.parse(recoveredCantidad!);
      this.productos.push(this.producto);
      this.cantidades.push(this.cantidad);
      localStorage.setItem('productos',JSON.stringify(this.productos));
      localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
    }
    //localStorage.setItem('producto', JSON.stringify(this.producto));
    //localStorage.setItem('cantidad', this.cantidad.toString());
  }
}
