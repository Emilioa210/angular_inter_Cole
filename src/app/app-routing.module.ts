import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCosListComponent } from './Componentes/admin-cos-list/admin-cos-list.component';
import { AdminCosComponent } from './Componentes/admin-cos/admin-cos.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { CosAdminLoginComponent } from './Componentes/cos-admin-login/cos-admin-login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ProductosComponent } from './Componentes/productos/productos.component';
import { IngresoDataComponent } from './Componentes/ingreso-data/ingreso-data.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:'productos',component:ProductosComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'cos_admin_login',component:CosAdminLoginComponent},
  {path:'admin-cos',component:AdminCosComponent},
  {path:'admin-cos-list',component:AdminCosListComponent},
  {path:'ingreso-data', component:IngresoDataComponent},
  {path:"**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
