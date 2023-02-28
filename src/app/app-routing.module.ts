import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCosListComponent } from './Componentes/admin-cos-list/admin-cos-list.component';
import { AdminCosComponent } from './Componentes/admin-cos/admin-cos.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { CosAdminLoginComponent } from './Componentes/cos-admin-login/cos-admin-login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ProductosComponent } from './Componentes/productos/productos.component';
import { IngresoDataComponent } from './Componentes/ingreso-data/ingreso-data.component';
import {DetallePedidoComponent} from './Componentes/detalle-pedido/detalle-pedido.component';
import { DataReceptorComponent } from './Componentes/data-receptor/data-receptor.component';
import { AuthGuard } from './guardianes/auth.guard';
import { RoleGuard } from './guardianes/role.guard';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:'productos/:id',component:ProductosComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'cos_admin_login',component:CosAdminLoginComponent},
  {path:'admin-cos/:id',component:AdminCosComponent, canActivate: [AuthGuard]},
  {path:'admin-cos-list/:id',component:AdminCosListComponent, canActivate: [AuthGuard]},
  {path:'ingreso-data', component:IngresoDataComponent},
  {path:'detalle-pedido', component:DetallePedidoComponent},
  {path:'data-receptor', component:DataReceptorComponent},

  {path:"**", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
