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

  ingredientes: { nombre: string, precio: number, seleccionado: boolean }[] = [
    { nombre: 'Jamon', precio: 1000, seleccionado: false },
    { nombre: 'Extra queso', precio: 1000, seleccionado: false },
    { nombre: 'Champiñones', precio: 1000, seleccionado: false },
    { nombre: 'Salame', precio: 1000, seleccionado: false },
    { nombre: 'Piña', precio: 1000, seleccionado: false },
    { nombre: 'Pimenton', precio: 1000, seleccionado: false }
  ];

  parametroId!: Producto;
  data: any = [];
  total!: number;
  producto: any = {};
  nombre!: string;
  desc!: string;
  precio!: number;
  foto!: string;
  cantidad: number = 1;
  carrito: Array<any> = [];
  ingredientesSeleccionados: any = [];
  mostrarBotones: boolean = false;
  especial: boolean = false;

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
        this.total = this.precio;
      });
  }
  ionViewWillLeave() {
    this.resetearCheckboxes();
    this.mostrarBotones = false;
  }

  resetearCheckboxes() {
    this.ingredientes.forEach(ingrediente => {
      ingrediente.seleccionado = false;
    });
  }

  async addCarrito(parametroId: number, cantidad: number) {
    if (this.ingredientesSeleccionados.length > 0) {
      this.especial = true;
      this.precio = this.precio + (this.ingredientesSeleccionados.length * 1000);
    }

    this.producto = {
      "id": this.parametroId,
      "desc": this.desc,
      "nombre": this.nombre,
      "precio": this.precio,
      "foto": this.foto,
      "cantidad": this.cantidad,
      "ingredientes": this.ingredientesSeleccionados,
      "especial": this.especial
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
      this.ingredientesSeleccionados = [];
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

  obtenerValorCheckbox(ingrediente: any) {
    if (ingrediente.seleccionado) {
      this.ingredientesSeleccionados.push(ingrediente);
      this.total += ingrediente.precio;
    } else {
      this.ingredientesSeleccionados.splice(this.ingredientesSeleccionados.indexOf(ingrediente), 1);
      this.total -= ingrediente.precio;
    }
    console.log(this.ingredientesSeleccionados);
    this.mostrarBotones = this.ingredientesSeleccionados.length > 0;
  }

}
