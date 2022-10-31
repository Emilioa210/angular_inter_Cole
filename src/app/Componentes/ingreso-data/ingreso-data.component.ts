import { Component, OnInit } from '@angular/core';
import { ColegioService } from 'src/app/servicios/colegio.service';
@Component({
  selector: 'app-ingreso-data',
  templateUrl: './ingreso-data.component.html',
  styleUrls: ['./ingreso-data.component.css']
})
export class IngresoDataComponent implements OnInit {
  colegios: Array<any> = [];
  cursos: Array<any> = [];
  cursoParalelo: Array<any> = [];
  paralelos: Array<any> = [];
  colegioSeleccionado:any = '';
  emisor = {

  }
  constructor(private colegioDB: ColegioService) { }

  ngOnInit(): void {
    this.colegioDB.getAll().subscribe(res=>{
      this.colegios = res as any[];
      console.log(this.colegios);
    });
  }

  selectColegio(event: any){
    var e = event.target.value;
    this.colegioDB.findCursos(e).subscribe(res=>{
      this.cursos=res as any [];
      var hash:any = {};

      this.cursos = this.cursos.filter(function(current) {
      var exists = !hash[current.CODIGO_CURSO];
      hash[current.CODIGO_CURSO] = true;
      return exists;
      });
        
        console.log(JSON.stringify(this.cursos));
    });

  }

  selectCurso(event:any){
    var e = event.target.value;
    this.colegioDB.findParalelosPorCursos(this.colegioSeleccionado,e).subscribe(res =>{
      this.paralelos = res as any[];
      console.log(this.paralelos);
    });
  }

}
