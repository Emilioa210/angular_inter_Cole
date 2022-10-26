import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productos: any[] = [];
  items = 0;
  constructor() { }

  ngOnInit(): void {
    this.productos = JSON.parse(localStorage.getItem('productos')!);
    this.items = this.productos.length;
  }

  menuShow = false;
  toggleNavbar() {
    this.menuShow = !this.menuShow;
  }

}
