import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProductoService } from "../services/api-producto.service";
// import {CarritoService} from "../servivio/carrito.service";
import { Producto } from "../interfaces/producto";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll | undefined;

  public data: any = []
  constructor(
    public apiProducto: ApiProductoService
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

}
