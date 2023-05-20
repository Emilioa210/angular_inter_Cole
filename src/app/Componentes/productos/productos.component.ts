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
      let elemento = this.producto;
      var i = 0;
      var repetido = false;
      this.productos.map((item:any) => {
        if(item.CODIGO_PRODUCTO == elemento.CODIGO_PRODUCTO){
          console.log("ELEMENTO REPETIDO: "+item.NOMBRE_PRODUCTO);
          repetido = true;
          var suma = this.cantidades[i] + this.cantidad
          this.cantidades[i] = suma;
          localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
        }
        i++;
      });
      if(repetido==false){
        this.productos.push(this.producto);
        this.cantidades.push(this.cantidad);
        localStorage.setItem('productos',JSON.stringify(this.productos));
        localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
      }
      
    }
  }
}
