import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  cantidadArticulos: number = 0; // Variable para almacenar la cantidad de artículos en el carrito
  carrito: any = [];

  constructor(private servicioCarrito: CarritoService) {}

  ngOnInit() {
    this.cantidadArticulos = this.servicioCarrito.getCantidadCarrito(); // Obtener la cantidad de artículos del carrito
  }

  ionViewDidEnter() {
    this.carrito = this.servicioCarrito.getCarrito();
    this.cantidadArticulos = this.carrito.length; // Actualizar la cantidad de artículos basada en la longitud del carrito
  }
}
