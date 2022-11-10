import { Component, OnInit } from '@angular/core';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoParaleloService } from 'src/app/servicios/curso-paralelo.service';
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
  curso:any = '';
  paralelo:any = '';
  emisor = {
      nombre:'',
      apellido: '',
      correo: '',
      telefono: '',
      id_colegio_curso_paralelo: null,
      apodo: '',
      regalo_apodo: false,
      mensaje: ''
  }
  constructor(private colegioDB: ColegioService,
              private cursoParaleloDB: CursoParaleloService) { }

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

  selectParalelo(event:any){
    this.cursoParaleloDB.findByCursoParalelo(this.curso, this.paralelo, this.colegioSeleccionado).subscribe(res=>{
        this.emisor.id_colegio_curso_paralelo = res.ID_COLEGIO_CURSO_PARALELO;
        console.log(this.emisor);
    });

  }

  saveEmisor(){
    console.log(this.emisor);
  }

}
