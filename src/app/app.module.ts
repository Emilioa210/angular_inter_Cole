import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { HomeComponent } from './Componentes/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { CosAdminLoginComponent } from './Componentes/cos-admin-login/cos-admin-login.component';
import { AdminCosComponent } from './Componentes/admin-cos/admin-cos.component';
import { AdminCosListComponent } from './Componentes/admin-cos-list/admin-cos-list.component';
import { IngresoDataComponent } from './Componentes/ingreso-data/ingreso-data.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ProductosComponent } from './Componentes/productos/productos.component';
import { DataReceptorComponent } from './Componentes/data-receptor/data-receptor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CarritoComponent,
    CosAdminLoginComponent,
    AdminCosComponent,
    AdminCosListComponent,
    IngresoDataComponent,
    ProductosComponent,
    DataReceptorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
