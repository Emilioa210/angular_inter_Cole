import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto ={
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
}
