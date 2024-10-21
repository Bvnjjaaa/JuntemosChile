import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reportes-inscritos',
  templateUrl: './reportes-inscritos.page.html',
  styleUrls: ['./reportes-inscritos.page.scss'],
})
export class ReportesInscritosPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(["/home"]);
  }

  

}
