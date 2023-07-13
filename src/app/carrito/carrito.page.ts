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

  productoSeleccionado = [];
  productos = [];
  carrito: any = [];
  total = 0;
  parametroId: any = {};


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
    const alert = await this.alertController.create({
      header: 'Gracias por su Orden',
      message: 'Pronto estará reciviendo noticias de su pedido :D',
      buttons: ['Gracias']
    });
    alert.present();
    this.remover();
    this.modalCtrl.dismiss();
    this.router.navigate(['/']);
  }

}
