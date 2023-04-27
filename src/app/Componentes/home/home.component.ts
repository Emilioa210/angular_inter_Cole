import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Array<any> = [];
  constructor(private productoDB:ProductoService,
              private router: Router) { }

  ngOnInit(): void {
    this.productoDB.getAll().subscribe( res =>{
        this.productos = res as any[];
        console.log(this.productos);
    });

    //localStorage.setItem('productos', JSON.stringify([]));
  }

  goToProducto(i:number){
    console.log("i: "+i)
    var id = this.productos[i].CODIGO_PRODUCTO;
    this.router.navigate(['productos', id]);
  }

}
