import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ProductosComponent } from './Componentes/productos/productos.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'productos',component:ProductosComponent},
  {path:'carrito',component:CarritoComponent},
  {path:"**", redirectTo:""}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
