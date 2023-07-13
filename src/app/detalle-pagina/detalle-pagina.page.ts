import { Component, OnInit } from '@angular/core';

import { Producto, ProductoConId } from "../interfaces/producto";
import { ActivatedRoute } from '@angular/router';
import { ApiProductoService } from "../services/api-producto.service";
import { Share } from "@capacitor/Share";
import { AlertController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { registerPlugin } from "@capacitor/core";



@Component({
  selector: 'app-detalle-pagina',
  templateUrl: './detalle-pagina.page.html',
  styleUrls: ['./detalle-pagina.page.scss'],
})
export class DetallePaginaPage implements OnInit {
  parametroId!: Producto;
  data: any = [];
  total!: number;
  producto: any = {};
  nombre!: string;
  desc!: string;
  precio!: number
  foto!: string;
  cantidad: number = 0;
  carrito: Array<any> = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private servicio: ApiProductoService,
    private servicioCarrito: CarritoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.rutaActiva.params.
      subscribe(parametros => {
        console.log("esto es el parametro : ", parametros);
        this.parametroId = parametros['id'];
      });
    this.servicio.getProducto(Number(this.parametroId)).
      subscribe(producto => {
        console.log(producto);
        this.data = producto;
        this.desc = this.data.desc;
        this.foto = this.data.imagen;
        this.nombre = this.data.nombre;
        this.precio = this.data.precio;
      });
  }

  // getProducto(){
  //   this.servicio.getProducto(Number(this.parametroId)).
  //   subscribe(producto =>{
  //     this.data = producto;
  //     console.log(this.data, "esta si es la lista")
  //   })
  // }

  async addCarrito(parametroId: number, cantidad: number) {
    this.producto = {
      "id": this.parametroId,
      "desc": this.desc,
      "nombre": this.nombre,
      "precio": this.precio,
      "foto": this.foto,
      "cantidad": this.cantidad,
    }


    if (this.cantidad == 0) {
      const alert = await this.alertController.create({
        header: 'denegado',
        message: 'debes agregar minimo un producto',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.servicioCarrito.agregaracarrito(this.producto);
      console.log("producto", this.producto);
    }
  }

  restCarrito(id: number) {
  }

  addReserva() {
    if (this.cantidad > -1) {
      this.cantidad += 1;
      //this.data.stock -= 1;
      this.total = this.precio * this.cantidad;
      console.log("Pizzas ordenadas : ", this.cantidad)
      console.log("precio : ", this.data.precio)
      // if (this.cantidad > this.stock) {
      //   this.cantidad -= 1;
      //   this.total = (this.precio * this.stock)
      // } para stock
    }
  }

  restReserva() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
      this.total = this.precio * this.cantidad;
      console.log("cantidad resta : ", this.cantidad);
    }
  }

  async shareApp() {
    await Share.share({

      title: 'Viste lo buena que está esta pizza?',
      text: 'Echale un vistazo a esta oferta',
      url: this.foto,
    });
  }

}
