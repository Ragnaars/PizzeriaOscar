import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductoConId } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ProductoConId[] = [];

  constructor(public http: HttpClient) {}

  getCarrito() {
    return this.carrito;
  }

  agregaracarrito(producto: ProductoConId) {

      this.carrito.push(producto);
    }

  removerDelCarrito() {
    this.carrito = [];
  }

  eliminarDelCarrito(producto: ProductoConId) {
    for (let [index, p] of this.carrito.entries()) {
      if (p.id === producto.id) {
        this.carrito.splice(index, 1)
      }
    }
  }

  getCantidadCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }
}
