import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from "./../services/carrito.service";
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  nombreProducto!: string;
  cantidadProducto!: number;
  productoSeleccionado = [];
  productos = [];
  carrito: any = [];
  total = 0;
  parametroId: any = {};
  countrycode: string = "56";
  whatsappnumber: string = "978840732";
  url: string = "https://api.whatsapp.com/send?phone=" + this.countrycode + this.whatsappnumber + "&text=Me gustaría ordenar los siguientes productos: " + this.carrito;





  constructor(
    private servicioCarrito: CarritoService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    public alertController: AlertController,
    private modalCtrl: ModalController

  ) {
  }


  ngOnInit() {
    this.carrito = this.servicioCarrito.getCarrito();
  }
  ionViewDidEnter() {
    this.carrito = this.servicioCarrito.getCarrito();
  }

  remover() {
    this.servicioCarrito.removerDelCarrito();
    this.router.navigate(['/'])
  }

  quitar(product: any) {
    for (let [index, p] of this.carrito.entries()) {
      if (p.id === product.id) {
        this.carrito.splice(index, 1)
      }
    }
  }

  getTotal() {
    return this.carrito.reduce((i: any, j: any) => i + j.cantidad * j.precio, 0);
  }

  romover() {
    this.carrito = [];
  }

  async checkout() {
    let url: string = "https://api.whatsapp.com/send?phone=" + this.countrycode + this.whatsappnumber + "&text=Me gustaría ordenar los siguientes producto : ";
    this.carrito.forEach((prod: any) => {
      this.nombreProducto = prod.nombre;
      this.cantidadProducto = prod.cantidad;
      url += this.cantidadProducto + " x " + this.nombreProducto + "\n ";

    });
    window.location.href = url;

  }

}
