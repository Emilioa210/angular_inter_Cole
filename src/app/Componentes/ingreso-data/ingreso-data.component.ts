import { Component, OnInit } from '@angular/core';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoParaleloService } from 'src/app/servicios/curso-paralelo.service';
import { Router } from '@angular/router';

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
  curso:any = '';
  paralelo:any = '';
  emisor = {
      nombre:'',
      apellido: '',
      correo: '',
      telefono: '',
      colegio: '',
      id_curso_paralelo: null,
      apodo: '',
      regalo_apodo: false,
      mensaje: '',
      tipo: null
  }
  constructor(private colegioDB: ColegioService,
              private cursoParaleloDB: CursoParaleloService,
              private router: Router) { }

  ngOnInit(): void {
    this.colegioDB.getAll().subscribe(res=>{
      this.colegios = res as any[];
      console.log(this.colegios);
    });
  }

  selectColegio(event: any){
    var e = event.target.value;
    console.log("CLAVE COLEGIO: "+e);
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
    this.colegioDB.findParalelosPorCursos(this.emisor.colegio,e).subscribe(res =>{
      this.paralelos = res as any[];
      console.log(this.paralelos);
    });
  }

  selectParalelo(event:any){
    this.cursoParaleloDB.findCursoParalelo(this.curso, this.paralelo).subscribe(res=>{
        this.emisor.id_curso_paralelo = res.ID_CURSO_PARALELO;
    });

  }

  saveEmisor(){
    console.log(this.emisor);
    localStorage.setItem('emisor',JSON.stringify(this.emisor))
    this.router.navigate(['data-receptor']);
  }

}
