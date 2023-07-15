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
  especial!: boolean;
  metodoPago: string = '';
  nombre: string = '';
  direccion: string = '';
  cantidadArticulos: number = 0; // Variable para almacenar la cantidad de artículos en el carrito

  constructor(
    private servicioCarrito: CarritoService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    public alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.carrito = this.servicioCarrito.getCarrito();
    console.log(this.carrito);
    this.cantidadArticulos = this.servicioCarrito.getCantidadCarrito(); // Obtener la cantidad de artículos del carrito
  }

  ionViewDidEnter() {
    this.carrito = this.servicioCarrito.getCarrito();
    this.cantidadArticulos = this.servicioCarrito.getCantidadCarrito(); // Actualizar la cantidad de artículos
  }

  remover() {
    this.servicioCarrito.removerDelCarrito();
    this.router.navigate(['/listar']);
  }

  quitar(product: any) {
    for (let [index, p] of this.carrito.entries()) {
      if (p.id === product.id) {
        this.carrito.splice(index, 1);
        this.cantidadArticulos = this.servicioCarrito.getCantidadCarrito(); // Actualizar la cantidad de artículos
      }
    }
  }

  getTotal() {
    return this.carrito.reduce((i: any, j: any) => i + j.cantidad * j.precio, 0);
  }

  romover() {
    this.carrito = [];
    this.cantidadArticulos = 0; // Reiniciar la cantidad de artículos
  }

  async checkout() {
    if (this.metodoPago && this.metodoPago.length > 0 && this.nombre && this.nombre.length >= 6 && this.direccion && this.direccion.length >= 6) {
      let url: string = "https://api.whatsapp.com/send?phone=" + this.countrycode + this.whatsappnumber + "&text=";

      this.router.navigate(['/loading-pay']);

      let mensaje: string = "Me gustaría ordenar:\n";

      this.carrito.forEach((prod: any) => {
        this.nombreProducto = prod.nombre;
        this.cantidadProducto = prod.cantidad;
        mensaje += this.cantidadProducto + " x " + this.nombreProducto;
        if (prod.ingredientes) {
          prod.ingredientes.forEach((ing: any) => {
            mensaje += " + " + ing.nombre;
          });
        }
        // mensaje += " || ";
        mensaje += "\n";
      });

      mensaje += "Mi método de pago es: " + this.metodoPago + "\n";
      mensaje += "Mi nombre es: " + this.nombre + "\n";
      mensaje += "Mi dirección es: " + this.direccion + "\n";

      url += encodeURIComponent(mensaje);
      window.location.href = url;
    } else {
      if (!this.metodoPago || this.metodoPago.length === 0) {
        console.log("Debes seleccionar un método de pago");
      } else {
        console.log("Debes completar el nombre (mínimo 6 letras) y la dirección");
      }
    }
  }

  metodoPagoSeleccionado() {
    return this.metodoPago === "Debito" || this.metodoPago === "Transferencia" || this.metodoPago === "Efectivo";
  }

  goToDisponibles() {
    this.router.navigate(['/listar']);
  }
}
