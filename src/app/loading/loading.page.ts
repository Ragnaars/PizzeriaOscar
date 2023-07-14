import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.checkInternetConnection();
  }

  // ionViewDidEnter() {
  //   this.checkInternetConnection();
  // }

  checkInternetConnection() {
    if (navigator.onLine) {
      setTimeout(() => {
        console.log("Hay conexión a Internet")
        this.router.navigate(['/tabs/listar']);
      }, 3000); // Retraso de 3 segundos (3000 milisegundos)
      // La conexión a Internet está disponible
      // Realizar cualquier otra verificación necesaria
    } else {
      setTimeout(() => {
        console.log("No hay conexión a Internet")
      }, 3000); // Retraso de 3 segundos (3000 milisegundos)
      // La conexión a Internet no está disponible
      // Puedes mostrar un mensaje de error o intentar nuevamente después
    }
  }



}