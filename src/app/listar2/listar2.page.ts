import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProducto2Service } from "../services/api-producto-2.service";
import { CarritoService } from './../services/carrito.service';
import { Producto } from "../interfaces/producto";
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar2',
  templateUrl: './listar2.page.html',
  styleUrls: ['./listar2.page.scss'],
})
export class Listar2Page implements OnInit {
  cantidadCarrito: number = 0;

  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll | undefined;

  public data: any = []
  constructor(
    public apiProducto: ApiProducto2Service,
    private router: Router,
    private carritoService: CarritoService
  ) { }

  ngOnInit() { //hace consultas asincronicas

    // this.apiProducto.listaProducto$.
    // subscribe(resp => {
    //   this.data = resp
    //   console.log("estos datitos tengo: :)",resp)
    // })
    this.apiProducto.obtenerPrimerosProductos();
    this.apiProducto.listaProducto$.subscribe(resp => {
      if (this.scroll) {
        this.scroll.complete();
      }
    })

  }

  ionViewWillEnter() {
    this.apiProducto.obtenerPrimerosProductos();
    this.apiProducto.listaProducto$
    this.cantidadCarrito = this.carritoService.getCantidadCarrito();
  }

  cargarMasElementos() {
    this.apiProducto.obtenerMasElementos();
  }



  handleRefresh(event: any) {
    setTimeout(() => {
      this.apiProducto.obtenerPrimerosProductos();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  goToCarrito() {
    this.router.navigate(['/carrito']);
  }
}
