import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  producto: any[] = [
    {
      "valor": "200$",
      "v-descuento": "100$",
      "titulo":"descripcion",
      "texto":"LLorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia"
    }
  ]

}
