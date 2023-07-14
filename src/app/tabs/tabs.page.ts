import { Component, OnInit } from '@angular/core';
import { CarritoPage } from "../../app/carrito/carrito.page";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  cantidadArticulos = CarritoPage.prototype.cantidadArticulos;

  constructor() { }



  ngOnInit() {
  }

}
