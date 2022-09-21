import { Component, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_inter_Cole';
  url:string
  constructor(@Inject(DOCUMENT) document: any){
    this.url = document.location.href;
  }

}
