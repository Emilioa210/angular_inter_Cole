import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminColegioService } from 'src/app/servicios/admin-colegio.service';
import { ColegioService } from 'src/app/servicios/colegio.service';

@Component({
  selector: 'app-admin-cos',
  templateUrl: './admin-cos.component.html',
  styleUrls: ['./admin-cos.component.css']
})
export class AdminCosComponent implements OnInit {

  colegio= {
    CODIGO_COLEGIO: '',
    NOMBRE_COLEGIO: ''
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adminDB:AdminColegioService,
              private colegioDB:ColegioService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.adminDB.get(id).subscribe(res=>{

        this.colegioDB.get(res.CODIGO_COLEGIO).subscribe(r =>{
          console.log("COLEGIO: "+r.NOMBRE_COLEGIO);
            this.colegio = r;
        });
    });
  }
  goToPedidos(){
    var id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([]).then(_result => {
      window.location.replace(`admin-cos-list/`+id);
    });
  }
  

}
