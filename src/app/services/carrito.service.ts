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
    const index = this.carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      this.carrito[index].cantidad += producto.cantidad;
    } else {
      this.carrito.push(producto);
    }
  }

  removerDelCarrito() {
    this.carrito = [];
  }

  eliminarDelCarrito(producto: ProductoConId) {
    const index = this.carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        this.carrito.splice(index, 1);
      }
    }
  }

  getCantidadCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }
}
